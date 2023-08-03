using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TodoListAPI.Data;
using TodoListAPI.Models.User;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public UsersController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public ActionResult<IEnumerable<UserModel>> GetUsers()
    {
        var users = _dbContext.Users.ToList();
        return Ok(users);
    }

    [HttpPost]
    public ActionResult<UserModel> CreateUser(UserModel user)
    {
        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();
        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }

    [HttpGet("{id}")]
    public ActionResult<UserModel> GetUserById(Guid id)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(Guid id)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return NotFound();
        }

        _dbContext.Users.Remove(user);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpDelete]
    public IActionResult DeleteAllUsers()
    {
        var users = _dbContext.Users.ToList();
        _dbContext.Users.RemoveRange(users);
        _dbContext.SaveChanges();
        return NoContent();
    }
}
