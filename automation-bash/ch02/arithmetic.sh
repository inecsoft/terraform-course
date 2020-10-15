#/bin/bash
((n++))
if
((n>4||$1 == 0))
then
echo n is $n one is $1
else
echo in the else
fi

set -x
((n=2**3 + 5))
((y=n^4))
echo y = $y  # prints 1, why?
((y=n|4))
echo y = $y  # prints 1, why?
((y=n&4))
echo y = $y  # prints 1, why?


