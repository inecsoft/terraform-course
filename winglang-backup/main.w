bring cloud;
bring expect;

let origin = new cloud.Bucket() as "origin";
let backup = new cloud.Bucket() as "backup";

new cloud.Function(inflight () => {

  origin.put("file1.txt", "This should be a copied over to the backup");
  origin.put("file2.txt", "This should be a copied over to the backup");
  origin.put("logging.log", "This should be a copied over to the backup");

}) as "Upload files";

origin.onCreate(inflight (file: str) => {
  if !file.endsWith(".log") {
    let data = origin.get(file);
    backup.put(file, data);
    log("adding ${file} into copies");
  } else {
    log("skipping log file:${file}");
  }
});