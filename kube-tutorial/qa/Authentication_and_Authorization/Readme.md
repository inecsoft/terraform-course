# **Securing Kubernetes Clusters using Authentication and Authorization**

There are two categories of users in Kubernetes: normal users and service accounts. Normal users represent humans using Kubernetes. Service accounts represent identities used by processes running in pods and managed by Kubernetes. Normal users, referred to as users from now on, are managed externally by an independent service. This gives Kubernetes flexibility in integrating with existing authentication systems. Kubernetes supports authentication using:

- x509 certificates
- Bearer tokens
- Basic authentication (usernames and passwords)
- OpenID Connect (OIDC) tokens (currently limited support)
- Kubernetes can also integrate with LDAP, SAML, and other authentication protocols by using plugins. Users can be members of groups to allow for easier access control management.

In this lab step, you will create a x509 certificate for a new user that is a member of a network-admin group. You will use the OpenSSL command-line tool to accomplish the tasks but other public key infrastructure (PKI) tools, such as easy-rsa and cfssl could be used if you are already familiar with them.

1. Enter the following commands to connect to the control plane node using SSH:

```
control_plane_ip=$(aws ec2 describe-instances --region us-west-2 \
 --filters "Name=tag:Name,Values=k8s-control-plane" \
 --query "Reservations[*].Instances[*].PrivateIpAddress" \
 --output text)  # get the control plane node's IP address using the AWS CLI
ssh $control_plane_ip
```

### **2. Create a private key for a new Kubernetes user named Andy:**

```
mkdir certs  # create certificate directory
sudo openssl genrsa -out certs/andy.key 2048  # generate private key
sudo chmod 666 certs/andy.key  # make the key read & write
```

This command would be performed by the requesting user, or by the Kubernetes admin if it is suitable for the admin to have access to the private key. You should take great caution to protect private keys. Anyone with access to the private key can impersonate the user that owns the compromised key.

### **3. Enter the following commands to allow OpenSSL to create a certificate signing request (CSR) for the user Andy:**

```
sudo sed -i 's%RANDFILE.*=.*$ENV::HOME/.rnd%#RANDFILE = $ENV::HOME/.rnd%' /etc/ssl/openssl.cnf
```

### **4. Enter the following command to create a certificate signing request (CSR) for a new user named Andy that is a member of the network-admin group:**

```
openssl req -new -key certs/andy.key -out certs/andy.csr -subj "/CN=andy/O=network-admin"
```

This is another command that the requesting user could perform. The command uses the private key (-key certs/andy.key) and the -subj option to describe the subject of the CSR. Kubernetes uses the following conventions with certificate subjects:

Common names (/CN) are mapped to the name of users
Organizations (/O) are mapped to the name of groups
Following those conventions, the command creates a CSR for a user named andy in a group named network-admin. You can include multiple organizations to include a user in multiple groups in Kubernetes. The -out option sets where to save the CSR.

### **5. Create a Kubernetes certificate signing request resource file:**

```
cat > certs/andy-csr.k8s <<EOF
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: new-user-request
spec:
  signerName: kubernetes.io/kube-apiserver-client
  request: $(cat certs/andy.csr | base64 | tr -d '\n')
  usages:
  - digital signature
  - key encipherment
  - client auth
EOF

```

This is another command the requesting user could perform. The Kubernetes CSR references the CSR created by OpenSSL with the request key. It must be base64 encoded and have newlines stripped out (tr -d '\n'). The usages can be any of the x509 key usage or extended key usage values. For a certificate to authenticate users, the above usages are all that is required.

Note: Although Kubernetes does not persist user objects, and assumes user management is performed externally, it is possible to sign CSRs using Kubernetes as long as it is properly configured. In particular, the Kubernetes Controller Manager provides the implementation for signing, and must be configured with the --cluster-signing-cert-file and --cluster-signing-key-file options pointing to the desired certificate authority key. You can confirm the options are set by searching the controller manager pod resource file with sudo grep cluster-signing /etc/kubernetes/manifests/kube-controller-manager.yaml.

### **6. Create the Kubernetes CSR:**

```
kubectl create -f certs/andy-csr.k8s
```

This command could be performed by the requesting user if they had sufficient access to the Kubernetes cluster. Otherwise, a Kubernetes admin could create the CSR, either manually or through an automated system.

### **7. Get the list of CSRs:**

```
kubectl get csr
```

The new-user-request CSR is shown. The REQUESTOR is kubernetes-admin. The default user for running kubectl on the control plane is kubernetes-admin, which is automatically configured during cluster creation. The kubeadm tool is used to create the cluster in this lab and is the recommended method for creating clusters.

### **8. Approve the CSR to generate the signed certificate:**

```
kubectl certificate approve new-user-request
```

A Kubernetes admin can either approve or deny a CSR. The default choice should be to deny a CSR and only approve a CSR if:

The subject of the CSR controls the private key used to sign the CSR. This can prevent impersonation attacks.
The subject of the CSR is authorized to act in the requested context. This prevents undesired subjects from participating in the cluster.

### **9. Confirm the CSR has been approved:**

```
kubectl get csr
```

### **10. Extract the certificate from the CSR resource object and save it to a file:**

```
kubectl get csr new-user-request -o jsonpath='{.status.certificate}' \
 | base64 --decode > certs/andy.crt
```

The jsonpath output format selects a subset of fields to output using a JSONPath expression. The certificate value must be base64 decoded.

Note: The process of creating a private key and CSR, then signing the CSR in Kubernetes to generate a certificate can also be used to create certificates for cluster components and resources. All nodes include the cluster's certificate authority bundle so the signed certificates can be used to establish trust in Kubernetes clusters. For cluster components and resources, you would usually want to use the server auth extended key usage instead of client auth used for authenticating users.

### **11. Print the certificate in text form:**

```
openssl x509 -noout -text -in certs/andy.crt
```

### **12. Remove the CSR files:**

```
rm -rf certs/andy.csr certs/andy-csr.k8s
```

After the certificate is signed, the CSR files are no longer needed.

The following instructions create a kubectl context to use the new user. These commands would be used by the requesting user when they have a copy of the approved certificate.

### **13. Create kubectl credentials for the new user:**

```
kubectl config set-credentials andy \
  --client-certificate=certs/andy.crt \
  --client-key=certs/andy.key \
  --embed-certs
```

The config command manages kubeconfig configuration files for kubectl. You are using the default file in ~/.kube/config. You need to add credentials for any new user to the kubeconfig file first. The --client-certificate and --client-key options set certificate credentials, the --token option sets a bearer token credential, and --username and --password set basic auth credentials. OpenID Connect authentication can be configured using the --auth-provider options. For certificate credentials, you can add --embed-certs to embed the certificates into the configuration file to make the kubeconfig file more portable but must be updated when certificates are rotated.

### **14. Create a new network admin context using the new user:**

```
kubectl config set-context network-admin --cluster=docker-desktop --user=andy
```

The --cluster option refers to a target cluster defined in the kubeconfig file. The only cluster is the cluster you have been working with and its nickname is kubernetes. Contexts can also include a namespace with the --namespace option if the context should be scoped to a specific namespace by default. If no namespace is provided, the default namespace is used.

### **15. Use the network-admin context:**

```
kubectl config use-context network-admin
```

### **16. Attempt to list the network policies in the default namespace:**

```
kubectl get networkpolicy
```

The new user has not been added to any non-default roles in the cluster, and is, therefore, only authorized to perform a minimal number of actions. The kubernetes-admin user that you had been using previously is in an admin role and is allowed to perform any action. You will configure authorization for the new user in the next lab step.

### **17. Return to the admin context:**

```
kubectl config use-context docker-desktop
```

When you send requests to Kubernetes, you are first authenticated, and then Kubernetes determines if you are authorized to complete the request. Kubernetes supports several Authorization modules. Role-based access control (RBAC) is a common way to control access to Kubernetes resources using roles. RBAC can be dynamically configured using the Kubernetes API and does not require modifying files compared to other user access control modules. Authorization, including RBAC, applies to both normal users and service accounts. You can also use RBAC on groups to simplify access control management. That is to say that normal users, service accounts, and groups are all valid subjects in RBAC.

Roles can be bound to subjects within a specific namespace (role binding) or cluster-wide (cluster role binding). It is a best practice to authorize access to the minimal amount of resources required by any subject, following the principle of least privilege. If a subject only needs access to a subset of namespaces, they should not be bound to a role using a cluster role binding.

In this lab step, you will first inspect existing roles and role bindings. Then you will bind the new user with a new cluster role that grants them access to administer networks for the entire cluster.

### **18. List all the contexts in your kubeconfig file**

```
kubectl config get-contexts
```

### **19. Check authorization actions**

```
kubectl auth can-i get pods --namespace default
```

### **20. List all of the cluster role bindings in the cluster:**

```
kubectl get rolebinding --all-namespaces
```

There are several role bindings created as part of cluster initialization. Notice that role bindings are always associated with a specific NAMESPACE and do not grant any access outside of the specified namespace. Also, note that the system: prefix is reserved for Kubernetes system use and should not be used when you create names.

### **21. List all of the role bindings in the cluster:**

```
kubectl get clusterrolebinding
```

Notice there are many system: bindings for each of the various controllers and components in the cluster. The controllers can be used with resources in any namespace, so it makes sense that they are cluster-wide role bindings. There are also a few cluster role bindings that are not prefixed with system:. For example, the cluster-admin binding is what gives the admin user in your current kubectl context access to all the resources in the cluster.

### **22. Get the cluster-admin cluster role binding YAML output to see an example of how a cluster role binding is specified:**

```
kubectl get clusterrolebinding cluster-admin -o yaml
```

Focus on the roleRef and subjects keys. The roleRef specifies which role or ClusterRole the binding applies to. cluster-admin is the name of a cluster role that is created during cluster creation. The role name is not required to have the same name as the binding, but they are usually the same by convention. The subjects specify which subjects are bound to the role. In this case, any user that is a member of the system:masters Group. The apiGroup defines the Kubernetes API Group of the subject, which is rbac.authorization.k8s.io for users and groups. For more information, enter kubectl explain clusterrolebinding.subjects.

### **23. Describe the cluster-admin cluster role:**

```
kubectl describe clusterrole cluster-admin
```

A role is a list of policy rules (PolicyRule). Each rule defines the Resources that the rule applies to or Non-Resource URLs that it applies to. This can be specified using a kind of resource (for example pods or services) or kind of resource and specific resource names to apply to only a subset of all the resources of a kind (for example pods named my-pod). Non-Resource URLs refer Kubernetes API endpoints that are not for resources, such as the /healthz cluster health endpoint. Each rule also defines a list of Verbs that specify the actions that are allowed, for example get, list, and watch for read-only access. Wildcards (\*) can be used to apply to all possible values. In the case of the cluster-admin role, they can use any verb on any resource or non-resource URL.

### **24. Describe the admin cluster role as an example of a more granularly defined role:**

```
kubectl describe clusterrole admin
```

### **25. View the YAML for the cluster-admin cluster role:**

```
kubectl get clusterrole cluster-admin -o yaml
```

The output reflects that a role is simply a list of rules. The rules can apply to resources or nonResourceURLs. Again, you see the apiGroups key referring to API Groups in Kubernetes. You will learn how to view API Groups, and see what resources are contained in an API Group next by sending an authenticated request to the Kubernetes API.

### **26. Send an authenticated request to the secure API server endpoint:**

```
api_endpoint=$(kubectl get endpoints kubernetes | tail -1 | awk '{print "https://" $2}')
sudo curl \
  --cacert /etc/kubernetes/pki/ca.crt \
  --cert /etc/kubernetes/pki/apiserver-kubelet-client.crt \
  --key /etc/kubernetes/pki/apiserver-kubelet-client.key \
  $api_endpoint
```

The curl command borrows certificates created during cluster creation to authenticate the request. You could also extract the admin certificate out of the kubeconfig file and get the same result. The API server is configured to only expose a secure port (6443). You can view the API server configuration with sudo more /etc/kubernetes/manifests/kube-apiserver.yaml and see that it includes --insecure-port=0 to confirm this. Only allowing secure traffic to the API server is a security best practice.

Sending a request with no URL path to the API server returns a list of all the supported paths. The paths beginning with /api or /apis refer to different API Groups. For example, recall the authorization.k8s.io API Group used in defining a cluster role binding appears in the list (/apis/authorization.k8s.io) and there are two versions of the API Group v1 (/apis/authorization.k8s.io/v1) and v1beta1 (/apis/authorization.k8s.io/v1beta1). New features are incorporated in beta versions of API Groups. In general, it is best to avoid beta versions, when possible, as they are more likely to have security flaws. The /api path is the core API Group with most common resources such as pods and services.

Note: kubectl api-versions can be used to get a list of all the resource API Groups, but cannot be used to get more information as in the following instructions. Instead the kubectl get --raw command can be used in those cases, e.g. kubectl get --raw $api_endpoint. This is more convenient to use than curl, however, curl is used in this lab to emphasize the use of certificates.

### **27. Send a request for the authorization API Group:**

```
sudo curl \
  --cacert /etc/kubernetes/pki/ca.crt \
  --cert /etc/kubernetes/pki/apiserver-kubelet-client.crt \
  --key /etc/kubernetes/pki/apiserver-kubelet-client.key \
  $api_endpoint/apis/authorization.k8s.io
```

Notice that a preferredVersion sets which version to use when an explicit version is not specified.

### **28. Send a request for version v1 of the core API Group (/api):**

```
sudo curl \
  --cacert /etc/kubernetes/pki/ca.crt \
  --cert /etc/kubernetes/pki/apiserver-kubelet-client.crt \
  --key /etc/kubernetes/pki/apiserver-kubelet-client.key \
  $api_endpoint/api/v1 \
  | more
```

Press space to page through the output. When you specify a version, the resources in the API Group are returned. For example, the output of the pod resource is as follows:

All of the verbs that are supported for the resource are given. This can be helpful for defining rules in roles. It can also be helpful to use kubectl with maximum verbosity (--v=9) to display the API Server requests that are being sent, and extract the API Group and version from the URL path. It may not always be clear what a specific verb grants access for. For a more descriptive output, you can use the /openapi path. Open API is a framework for building and documenting APIs.

### **29. Send a request for version v2 of the Open API document using the /openapi path:**

```
sudo curl \
  --cacert /etc/kubernetes/pki/ca.crt \
  --cert /etc/kubernetes/pki/apiserver-kubelet-client.crt \
  --key /etc/kubernetes/pki/apiserver-kubelet-client.key \
  $api_endpoint/openapi/v2 > openapi.json

```

The output is much more verbose (the file is several megabytes in size), but you can understand the purpose of each verb from it. You can search the openapi.json output file if you want. As an example, the output for the api/v1/pods path begins as follows:

From the description and operationId, you can see that the GET verb on /api/v1/pods is for listing pods across all namespaces. Now that you understand how to find the API Groups, resources, and verbs for RBAC policy rules, you can proceed to create a network admin role.

### **30. Create a cluster role resource file for network administration:**

```
cat > network-admin-role.yaml <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: network-admin
rules:
- apiGroups:
  - networking.k8s.io
  resources:
  - networkpolicies
  verbs:
  - '*'
- apiGroups:
  - extensions
  resources:
  - networkpolicies
  verbs:
  - '*'
EOF
```

The role has full access to network policies. This role may be too restrictive for network administration but is sufficient for the purpose of this Lab.

### **31. Create the network-admin cluster role:**

```
kubectl create -f network-admin-role.yaml
```

### **32. Bind users in the network-admin group to the network-admin cluster role:**

```
kubectl create clusterrolebinding network-admin --clusterrole=network-admin --group=network-admin
```

### **33. Return to the network admin context:**

```
kubectl config use-context network-admin
```

### **34. Re-attempt to get the network policies in the default namespace as you did at the end of the previous lab step:**

```
kubectl get networkpolicy
```

With the permissions granted to the network-admin group, the user Andy is now able to get the network policies.

### **35. Return to the admin context:**

```
kubectl config use-context kubernetes-admin@kubernetes
```

### **Summary:**

In this Lab step, you learned about Kubernetes authorization using RBAC. You inspected Kubernetes roles, cluster roles, role bindings, cluster role bindings, and API Groups. Using those skills, you can create policy rules that define the operations a role allows. You finished by creating a network admin cluster role and binding it to the network-admin group.

########################

### **Set cluster parameters in the kubeconfig file**

```
api_endpoint=$(kubectl get endpoints kubernetes | tail -1 | awk '{print "https://" $2}')
kubectl config set-cluster kubernetes --certificate-authority=ca.crt --embed-certs=true --server=$api_endpoint
```

### **Set user credentials in the kubeconfig file**

```
kubectl config set-credentials andy --client-certificate=certs/andy.crt --client-key=certs/andy.key --embed-certs=true
```

### **Set context in the kubeconfig file**

```
kubectl config set-context andy@kubernetes --cluster=docker-desktop --user=andy --namespace=default
kubectl config set current-context andy@kubernetes
```
