# Growth APP Content

```shell
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "html/${0%.md}.html"' {} \;
```