palindromes = ["Ana", "OMOMO", "ivan's"]

def isPalindrome(palindromes):
    for s in palindromes:
       # return s == s[::-1]
       
       if (s.lower() == str(reversed(s)).lower()):
          print(s + " {}".format("true"))
       else: 
          print(s + " {}".format("false")  )
       
isPalindrome(palindromes)
