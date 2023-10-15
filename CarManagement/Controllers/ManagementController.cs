using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;
using CarManagement.Models;
using CarManagement.Helper;
using System.IO;
using System.Net.Http.Headers;

namespace CarManagement.Controllers
{
    public class ManagementController : Controller
    {
        public readonly string commonURL = "https://localhost:7186/api";
        APICalls aPICalls = new APICalls();
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult getDate(int id = 0)
        {
            List<Management> jsonObjectData = new List<Management>();
            try
            {
                var resultClient = aPICalls.GetApi(commonURL + "/CarManagement/getlist?id=" + id);
                if (resultClient.IsSuccessStatusCode)
                {
                    var data = resultClient.Content.ReadAsStringAsync().Result;
                    jsonObjectData = JsonConvert.DeserializeObject<List<Management>>(data);
                    var result = jsonObjectData;
                    var jsonResult = Json(new { aaData = result });
                    return jsonResult;
                }
                return Json(new { aaData = jsonObjectData });
            }
            catch (Exception ex)
            {
                return Json(new { aaData = jsonObjectData });
            }
        }
        [HttpPost]
        public JsonResult create(Management modal)
        {
            List<Management> jsonObjectData = new List<Management>();
            try
            {
                var resultClient = aPICalls.PostApi(commonURL + "/CarManagement/create", modal);
                if (resultClient.IsSuccessStatusCode)
                {
                    var data = resultClient.Content.ReadAsStringAsync().Result;
                    var jsonResult = Json(new { aaData = data });
                    return jsonResult;
                }
                return Json(new { aaData = jsonObjectData });
            }
            catch (Exception ex)
            {
                return Json(new { aaData = jsonObjectData });
            }
        }
        [HttpPost]
        public JsonResult Update(Management modal)
        {
            List<Management> jsonObjectData = new List<Management>();
            try
            {
                var resultClient = aPICalls.PostApi(commonURL + "/CarManagement/update",modal);
                if (resultClient.IsSuccessStatusCode)
                {
                    var data = resultClient.Content.ReadAsStringAsync().Result;
                    //jsonObjectData = JsonConvert.DeserializeObject<List<Management>>(data);
                    //var result = jsonObjectData;
                    var jsonResult = Json(new { aaData = data });
                    return jsonResult;
                }
                return Json(new { aaData = jsonObjectData });
            }
            catch (Exception ex)
            {
                return Json(new { aaData = jsonObjectData });
            }
        }
        [HttpGet]
        public JsonResult Delete(int id)
        {
            List<Management> jsonObjectData = new List<Management>();
            try
            {
                var resultClient = aPICalls.DeleteApi(commonURL + "/CarManagement/delete?ID=" + id);
                if (resultClient.IsSuccessStatusCode)
                {
                    var data = resultClient.Content.ReadAsStringAsync().Result;
                    var jsonResult = Json(new { aaData = data });
                    return jsonResult;
                }
                return Json(new { aaData = jsonObjectData });
            }
            catch (Exception ex)
            {
                return Json(new { aaData = jsonObjectData });
            }
        }
        public IActionResult Upload(Image obj)
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("wwwroot", "assets","image");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        obj.Name = dbPath;
                        obj.File = fileName;
                        stream.Close();
                    }
                    
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
