using System;
using System.Net;

namespace pingapp
{
    public class Program
    {
        static void Main(string[] args)
        {
            var hostname = "db";

            
            IPHostEntry host = Dns.GetHostEntry(hostname);

            Console.WriteLine($"GetHostEntry({hostname}) returns:");

            foreach (IPAddress address in host.AddressList)
            {
                Console.WriteLine($"    {address}");
               
            }
        
        }

    }
}
