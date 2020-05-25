***

# __Dockerize web api__

***

### 1. __Create your webapi__
```
 docker run -v $(pwd):/app -w /app mcr.microsoft.com/dotnet/core/sdk:3.1 dotnet new webapi -o dockerapi
```

```
docker run --rm -d --name webapi -v /home/devop/terraform/docker_compose_project/webapi/dockerapi:/app -p 5001:5001 -p 5000:5000 -w /app mcr.microsoft.com/dotnet/core/sdk:3.1 dotnet run
```

### __Test that app is runnig__ 
```
 nc -vz  localhost 5001
```

### __Test that app is runnig__ 
```
 nc -vz  localhost 5000
```
### __Test that app is runnig and format it in json__ 
```
curl  localhost:5000/WeatherForeCast | jq
```

### 2. __Build the image and test it__
```
cd dockerapi
docker build -t dockerapi .
docker run -it -p 3000:80 --name dockerapi dockerapi 
```

### 3. __Create the docker-compose file and run it__ 
```
docker-compose up -d
```
### 4. __Add the seed.sql file__

### 5. __Create them modules__
cd dockerapi  
mkdir Models  

__Note:__
add the app Blog

```
public class Blog
{
  public int Id { get; set; }
  public string Title { get; set; }
  public string Description { get; set; }
}

```
### 6. __Install dependencies__
```
cd dockerapi
sudo dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

### 7. __Configure db conection__
__Note:__

Open the file Startup.cs and add the following lines to the method ConfiguresServices.
We remember how was created the environment varialbe DB_CONNECTION_STRING in the docker-compose.ymal file.

```  
using dockerapi.Models;
```

```

var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
services.AddDbContext<ApiDbContext>(options =>
options.UseNpgsql(
connectionString
)
);
```

### 8. __Create communication with Db__ 
__Note:__
Now we will create DbContext which will be the principal class that communicate with the DB.
We will create a new ApiDbContext.cs in Models adding the following:

```
public class ApiDbContext : DbContext
{
   public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
   {

   }
   public DbSet<Blog> { get; set; }

   protected override void OnModelCreating(Modeluilder modelBuilder)
   {
      base.OnModelCreating(modelBuilder);
      new BlogMap(modelBuilder.Entity<Blog>());
   }
}
```

Here DbSet<Blog> Blogs corresponds to the table blog in the BD. Due to the tables and columns in Postgres
are in lower case and ours clases C# are written in Pascal notation;
we have to map the names to the tables and properties to our model.

### 9. __Mapping data__
We will create a new directory called Maps and will add the file BlogMap.cs

```
mkdir Maps
cd Maps
vim BlogMap.cs
```

```
public class BlogMap
{
  public BlogMap(EntityTypeBuilder<Blog> entityBuilder)
  {
     entityBuilder.Haskey(x => x.Id);
     entityBuilder.ToTable("blog");

     entityBuilder.Property(x => x.Id).HasColumnName("id");
     entityBuilder.Property(x => x.Title).HasColumnName("title");
     entityBuilder.Property(x => x.Description).HasColumnName("description");
  }
}
```

We will create a class Web Api Controller which controls the BlogController.cs on the directory Controllers and 
will add the database context(ApiDbContext) in the Controller using a constructor.
 Add the following to the controller:

```
using dockerapi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using System.Linq;

namespace dockerapi.Controllers
{
   [Route("api/[controller]")]
   [ApiController]

   public class BlogController : ControllerBase
   {
       private readonly ApiDbContext _context;
       public BlogController(ApiDbContext context)
       {
           _context = context;
       }

       [HttpGet]
       public object Get()
       {
           return _context.Blogs.Where(b => b.Title.contains("Title")).Select((c) => new {
               Id = c.Id,
               Title = c.Title,
               Description = c.Description
           }).ToList();

       }
   }

   
}
```
### 10. __Build the app__ 
```
docker-compose build
docker-compose up -d

curl localhost:3000/api/blog
```

***
