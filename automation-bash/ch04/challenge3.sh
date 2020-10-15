function usage {
   echo Options are -r -h -b --branch --version --help
   exit 1
}
function handleopts {
    OPTS=`getopt -o r:hb::x: -l exclude:  -l branch::  -l help -l version -- "$@"`
    if [ $? != 0 ]
    then
        echo ERROR parsing arguments >&2
        exit 1
    fi
    eval set -- "$OPTS"
    while true ; do
        case "$1" in
            -r ) rightway=$2 
                shift 2;;
            --version ) echo "Version 1.2"; 
                 exit 0;;
            -h | --help ) usage; 
                 shift;;
            -b | --branch)  
                case "$2" in
                "") branchname="default"  ; shift 2 ;;
                 *) branchname="$2" ; shift 2 ;;
                esac ;;
	    -x | --exclude)
                  exlist="$2"
                  shift 2;;
            --) shift; break;;
        esac
    done
    if [ "$#" -ne 0 ]
    then
	echo Error extra command line arguments "$@"
	usage
    fi
}
rightway=no
exlist="empty"
handleopts $@
echo rightway = $rightway
echo branchname = $branchname
echo exlist = $exlist

