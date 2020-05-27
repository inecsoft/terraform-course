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
