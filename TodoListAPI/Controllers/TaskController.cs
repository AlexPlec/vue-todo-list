using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TodoListAPI.Data;
using TodoListAPI.Models.Task;
using TodoListAPI.Models.User;
using System.Security.Claims;


namespace TodoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public TasksController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TaskModel>> GetTasks()
        {
            var tasks = _dbContext.Tasks.ToList();
            return Ok(tasks);
        }

        [HttpPost]
        public ActionResult<TaskModel> CreateTask(TaskModel task)
        {
            _dbContext.Tasks.Add(task);
            _dbContext.SaveChanges();
            return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task);
        }

        [HttpGet("{id}")]
        public ActionResult<TaskModel> GetTaskById(Guid id)
        {
            var task = _dbContext.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(Guid id, TaskModel updatedTask)
        {
            var task = _dbContext.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            task.Description = updatedTask.Description;
            task.Completed = updatedTask.Completed;
            // Update other properties as needed

            _dbContext.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(Guid id)
        {
            var task = _dbContext.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            _dbContext.Tasks.Remove(task);
            _dbContext.SaveChanges();
            return NoContent();
        }
    }

}
