using Microsoft.EntityFrameworkCore;
using TodoListAPI.Models;

namespace TodoListAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<TaskModel> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskModel>().ToTable("Tasks");
            modelBuilder.Entity<TaskModel>().HasKey(t => t.Id);
            modelBuilder.Entity<TaskModel>().Property(t => t.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<TaskModel>().Property(t => t.Description).IsRequired();
            modelBuilder.Entity<TaskModel>().Property(t => t.Completed).IsRequired();

            // Add other configurations for your Task entity if needed
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string connectionString = "Server=192.168.0.101;Database=toDoList;Uid=root;Pwd=Ilidan01;";
                optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 26)));
            }

            base.OnConfiguring(optionsBuilder);
        }
    }
}
