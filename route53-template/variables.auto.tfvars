######################-inecsoft.co.uk-########################################
route53_inecsoft_co_uk_txt_records = {
    "_pki-validation" = {
        name           = "_pki-validation"
        value          = ["fdazhfdsgf-5558-7936-DC54-0B8E-FCBB-A142-poiu"]
        ttl            = "300"
        routing_policy = "Simple"
    },
}

route53_inecsoft_co_uk_a_records = {
    "adventure" = {
        name           = "adventure"
        value          = ["10.79.33.200"]
        ttl            = "300"
        routing_policy = "Simple"
    },
}

route53_inecsoft_co_uk_a_alias_records = {
    "inecsoft.co.uk" = {
        name  = "inecsoft.co.uk"
        value = "vghyyticqb8b6423.cloudfront.net."
    },
}

route53_inecsoft_co_uk_cname_records = {
    "www.inecsoft.co.uk" = {
        name           = "www.inecsoft.co.uk."
        value          = ["inecsoft.co.uk."]
        ttl            = "300"
        routing_policy = "Simple"
    },

}

route53_inecsoft_co_uk_mx_records = {
    "inecsoft.co.uk" = {
        name = "inecsoft.co.uk."
        value = [
            "0 inecsoft.co.uk.mail.protection.outlook.com.",
        ]
        ttl            = "60"
        routing_policy = "Simple"
    },

}

route53_inecsoft_co_uk_srv_records = {
    "_sipfederationtls._tcp" = {
        name           = "_sipfederationtls._tcp"
        value          = ["100 1 5061 sipfed.online.lync.com."]
        ttl            = "60"
        routing_policy = "Simple"
    },

}
