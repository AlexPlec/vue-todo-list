using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoListAPI.Models
{
public class TaskModel
{

    [Key]
[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
public Guid Id { get; set; }

    [Required]
public string? Description { get; set; }
    public bool Completed { get; set; }

}
}