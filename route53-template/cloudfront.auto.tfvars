
cloudfront_records = {
  "inecsoft_co_uk" = {
    aliases     = [
      "inecsoft.co.uk",
      "www.inecsoft.co.uk"
    ]
    domain      = "inecsoft.co.uk"
    origin_path = "" 
    #echo "aws_acm_certificate.acm-certificate_inecsoft_co_uk.arn" | terraform console
    viewer_certificate = {
      acm_certificate_arn  = "arn:aws:acm:us-east-1:050124427385:certificate/e323d731-0c0c-47dd-bca3-63938e289999"     
      minimum_protocol_version = "TLSv1.2_2021"
    }
    
    tag                      = "inecsoft.co.uk"
    
  }

}