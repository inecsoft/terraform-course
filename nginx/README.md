<div align="center">
    <h1>NGINX PROXY</h1>
</div>

***
<div align="left">
<p>1. sed "a" command lets us append lines to a file, based on the line number or regex provided. So, the lines will be added to the file AFTER the line where condition matches.
2. sed "i" command lets us insert lines in a file, based on the line number or regex provided. So, the lines will be added to the file AT the location where line number matches or BEFORE the line where pattern matches.
3. sed with option -i will edit the file in place, i.e. unless you use the option -i, the changes will not be written to the file. (Explained in later section)
</p>
</div>

### __1. Append a line after 'N'th line__

``` bash
sed 'N a <LINE-TO-BE-ADDED>' FILE.txt
```

### __2. Append Line using Regular Expression/Pattern__

``` bash
sed '/PATTERN/ a <LINE-TO-BE-ADDED>' FILE.txt

```
### 3.__Insert line using the Line number__

``` bash
sed 'N i <LINE-TO-BE-ADDED>' FILE.txt

```