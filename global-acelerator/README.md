<div  align="center">
    <h1>AWS Global Accelerator </h1>
    <h2>Improving Latency and Design for Failure</h2>
</div>

***
<div  align="center"> 
   <h3>AWS Global Accelerator features</h3>
    <b style="text-align:left">
       <ul style="list-style-type:circle;">
         <li>Static anycast IP addresses</li>
         <li>Fault tolerance using network zones</li>
         <li>Global performance-based routing</li>
         <li>TCP Termination at the Edge</li>
         <li>Bring your own IP (BYOIP)</li>
         <li>Fine-grained traffic control</li>
         <li>Continuous availability monitoring</li>
         <li>Client affinity</li>
         <li>Distributed denial of service (DDoS) resiliency at the edge</li>
       </ul> 
    </b>
</div>

   - __Static anycast IP addresses__
   - __Fault tolerance using network zones__
   - __Global performance-based routing__
   - __TCP Termination at the Edge__
   - __Bring your own IP (BYOIP)__
   - __Fine-grained traffic control__
   - __Continuous availability monitoring__
   - __Client affinity__
   - __Distributed denial of service (DDoS) resiliency at the edge__

***
<div  align="center"> 
   <h3>How It Works</h3>
   </div>

The Global Accelerator provides two static Anycast IPv4 addresses. All you need to do is to define endpoints in one or multiple regions. The following endpoints are supported:

  * _Internet-facing Application Load Balancer (ALB)_
  * _Internal Application Load Balancer (ALB)_
  * _Internet-facing Network Load Balancer (NLB)_
  * _Elastic IP_
  * _EC2 Instance (with or without Public IP)_

 <div align="center">
    <img src="images/global-acelerator.JPG" width="700"/>
</div>$

***
<div  align="center"> 
   <h3>To make use of Global Accelerator, you need to:</h3>
     <ol style="text-align:left" type="1">
       <li>Create an accelerator which provisions two static Anycast IP addresses.</li>
       <li>Create a listener for the protocol and port or port range.</li>
       <li>Create an endpoint group for every region you want to route traffic to.</li>
       <li>Add an endpoint (e.g., an ALB) to each endpoint group.</li>
    </ol>
</div>

***
<div  align="center"> 
   <h3>CloudFront vs. Global Accelerator</h3>
   <p style="text-align:left"> When optimizing for low latency and response times, CloudFront - the    Content Delivery Network (CDN) - is an obvious choice. Both services optimize the route of a request from clients all over the world to your endpoints. However, CloudFront can process a request and cache a response from 200 locations distributed worldwide. The Global Accelerator routes the packages to one of your endpoints (one or multiple endpoints optionally distributed among regions).

   There is another fundamental difference between CloudFront and Global Accelerator: CloudFront caches responses from your endpoints. At best, CloudFront can answer an incoming request from an edge location near to the client without forwarding a request to your endpoint. Depending on your workload, the majority of requests are cacheable, which reduces the response times and latencies enormously.

   In summary, the result of the latency benchmark with the same setup, as described above, is not a surprise. The Global Accelerator reduces the latency to the ALB. But still, the package is routed from each continent to the ALB in eu-west-1. CloudFront, on the other hand, was able to cache the responses at the edge locations.
   </p>
</div>

***
