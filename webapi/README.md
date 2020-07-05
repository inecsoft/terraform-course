***

<div align="center">
  <img src="images/architecture.png" width="800" />
</div>

### __Start Project__

```
dotnet new webapi -o TodoApi
cd TodoApi
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.InMemor
```

### __Test the app__
https://localhost:5001/WeatherForecast


```
curl localhost:5001/WeatherForecast | jq
```

### __Add a model class__

* vim Models/TodoItem.cs

```
public class TodoItem
{
    public long Id { get; set; }
    public string Name { get; set; }
    public bool IsComplete { get; set; }
}
```

### __Add a database context__
* vim Models/TodoContext.cs

```
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
```

### __Register the database context__
* vim Startup.cs

```
// Unused usings removed
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TodoContext>(opt =>
               opt.UseInMemoryDatabase("TodoList"));
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
```

### __Scaffold a controller__
```
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet aspnet-codegenerator controller -name TodoItemsController -async -api -m TodoItem -dc TodoContext -outDir Controllers
```
#### __The generated code:__

    * Marks the class with the [ApiController] attribute. This attribute indicates that the controller responds to web API requests. For information about specific behaviors that the attribute enables, see Create web APIs with ASP.NET Core.
    * Uses DI to inject the database context (TodoContext) into the controller. The database context is used in each of the CRUD methods in the controller.

#### __The ASP.NET Core templates for:__

    * Controllers with views include [action] in the route template.
    * API controllers don't include [action] in the route template.

When the [action] token isn't in the route template, the action name is excluded from the route. That is, the action's associated method name isn't used in the matching route.

### ___Replace the return statement in the PostTodoItem to use the nameof operator:_

```
// POST: api/TodoItems
[HttpPost]
public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
{
    _context.TodoItems.Add(todoItem);
    await _context.SaveChangesAsync();

    //return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
    return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
}
```

### __Test PostTodoItem with Postman__

    * Create a new request.
    * Set the HTTP method to POST.
    * Select the Body tab.
    * Select the raw radio button.
    * Set the type to JSON (application/json).
    * In the request body enter JSON for a to-do item:


```
{
  "name":"walk dog",
  "isComplete":true
}
```

    * Select Send.

<div align="center">
  <img src="images/postapi.png" width="800" />
</div>

```
curl localhost:5001/api/TodoItems | jq

```

### __Test the location header URI__

    * _Select the Headers tab in the Response pane._
    * _Copy the Location header value:_

<div align="center">
  <img src="images/getapi.png" width="800" />
</div>

    * Set the method to GET.
    * Paste the URI (for example, https://localhost:5001/api/TodoItems/1).
    * Select Send.

***
### __Troutbleshoot__

    * docker-compose ps -a
    * docker logs todoapi 

***
[REF:](https://docs.microsoft.com/en-gb/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1&tabs=visual-studio-code)
***