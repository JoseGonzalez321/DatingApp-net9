using API.Controllers;
using API.Data;

namespace API.Controllers;

using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BuggyController(DataContext context) : ControllerBase
{
    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetAuth()
    {
        return "secret text";
    }

    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    {
        var x = context.Users.Find(-1);

        if (x == null) return NotFound();
        return x;
    }

    [HttpGet("server-error")]
    public ActionResult<AppUser> GetServerError()
    {
        var x = context.Users.Find(-1) ?? throw new Exception("Bad thing happened!");
        return x;
    }

    [HttpGet("bad-request")]
    public ActionResult<string> BadRequest()
    {
        return BadRequest("Not a good request");
    }
}