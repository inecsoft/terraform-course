{for (i=1;i<NF;i++)
    words[$i]++}
 END{printf("is=%d,ls=%d,the=%d\n",
     words["is"],words["ls"],words["the"])}

