using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TodoListAPI.Models.User;

namespace TodoListAPI.Models.Task
{
    public class TaskModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string? Description { get; set; }

        public bool Completed { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public UserModel? User { get; set; }
    }
}
