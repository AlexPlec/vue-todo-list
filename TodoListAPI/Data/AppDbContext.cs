using Microsoft.EntityFrameworkCore;
using TodoListAPI.Models;
using TodoListAPI.Models.Task;
using TodoListAPI.Models.User;

namespace TodoListAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<TaskModel> Tasks { get; set; } = null!;
        public DbSet<UserModel> Users { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskModel>().ToTable("Tasks");
            modelBuilder.Entity<TaskModel>().HasKey(t => t.Id);
            modelBuilder.Entity<TaskModel>().Property(t => t.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<TaskModel>().Property(t => t.Description).IsRequired();
            modelBuilder.Entity<TaskModel>().Property(t => t.Completed).IsRequired();

              modelBuilder.Entity<TaskModel>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tasks)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserModel>().ToTable("Users");
            modelBuilder.Entity<UserModel>().HasKey(u => u.Id);
            modelBuilder.Entity<UserModel>().Property(u => u.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<UserModel>().Property(u => u.Login).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.AutoLogin).IsRequired();

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
