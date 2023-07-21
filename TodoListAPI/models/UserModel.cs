using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TodoListAPI.Models.Task;

namespace TodoListAPI.Models.User
{
    public class UserModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string? Login { get; set; }

        public bool AutoLogin { get; set; }

        public List<TaskModel>? Tasks { get; set; }
    }
}
