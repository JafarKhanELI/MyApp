using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;


namespace MyApp.Models
{
    public class LinksRepository
    {
        string FilePath = HostingEnvironment.MapPath("~/App_Data/Links.json");

        public List<LinkModel> Retrive()
        {
            var json = System.IO.File.ReadAllText(FilePath);

            var links = JsonConvert.DeserializeObject<List<LinkModel>>(json);

            return links;
        }

        public LinkModel Save(LinkModel link)
        {
            var links = Retrive();
            var maxID = links.Max(p => p.Id);
            link.Id = maxID + 1;
            links.Add(link);
            WriteData(links);
            return link;
        }

        public LinkModel Save(int id,LinkModel link)
        {
            var links = Retrive();
            var index = links.FindIndex(l => l.Id == id);
            if (index >= 0)
            {
                links[index] = link;
                WriteData(links);

            }
            else
                return null;
            return link;
        }

        public bool WriteData(List<LinkModel> links)
        {
            var json = JsonConvert.SerializeObject(links, Formatting.Indented);
            
            System.IO.File.WriteAllText(FilePath, json);

            return true;
        }
    }
}