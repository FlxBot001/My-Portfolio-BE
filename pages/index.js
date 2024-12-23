import Head from "next/head";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";
import { FcHome } from "react-icons/fc";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import LoginLayout from "@/components/LoginLayout";

export default function Home() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  // for render error
  const [blogData, setBlogData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  // define option within the component scope
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blogs Created Monthly by Year",
      },
    },
  };

  useEffect(() => {
    // fetch data from api
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blogs");
        const responseproject = await fetch("/api/projects");
        const responseShop = await fetch("/api/shops");
        const responseGallery = await fetch("/api/photos");
        const data = await response.json();
        const dataProject = await responseproject.json();
        const dataShop = await responseShop.json();
        const dataPhotos = await responseGallery.json();

        setBlogData(data); // assuming data is a array of blog objects
        setProjectData(dataProject);
        setShopData(dataShop);
        setPhotoData(dataPhotos);
        setLoading(false); // after featchig the data make loading false
      } catch (error) {
        setLoading(false); // if there is an error make loading false
      }
    };

    fetchData(); // call the function
  }, []);

  // Aggeregate data by the year and month
  const monthlyData = blogData.filter((dat) => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear(); // get the year
    const month = new Date(blog.createdAt).getMonth(); // get the month
    acc[year] = acc[year] || Array(12).fill(0); // Initialize array for the year if not exists
    acc[year][month]++; // increment the count for the month
    return acc; // return the accumulator
  }, {});

  const currentYear = new Date().getFullYear(); // get the current year
  const years = Object.keys(monthlyData); // get the years from the data
  const label = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]; // month labels

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0), // if no data for a month, default to 0
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
  }));

  const data = {
    labels: label,
    datasets: datasets,
  };

  return (
    <LoginLayout>
      <>
        <Head>
          <title>Portfolio Backend</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="dashboard">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Admin <span>Dashboard</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <FcHome /> <span>/</span>
              <span>Dashboard</span>
            </div>
          </div>

          {/* dashboard four cards */}
          <div className="topfourcards flex flex-sb">
            {/* Blogs card */}
            <div className="four_card">
              <h2>Total Blogs</h2>
              <span>{blogData.filter(dat => dat.status === 'publish').length}</span>
            </div>

            {/* Projects card */}
            <div className="four_card">
              <h2>Total Projects</h2>
              <span>{projectData.filter(dat => dat.status === 'publish').length}</span>
            </div>

            {/* Products card */}
            <div className="four_card">
              <h2>Total Products</h2>
              <span>{shopData.filter(dat => dat.status === 'publish').length}</span>
            </div>

            {/* Gallery's card */}
            <div className="four_card">
              <h2>Gallery Photos</h2>
              <span>{photoData.length}</span>
            </div>
          </div>

          {/* year overview */}
          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">
                  {blogData.filter(dat => dat.status === 'publish').length} / 365 <br /> <span>Total Published</span>
                </h3>
              </div>
              <Bar data={data} options={options} />
            </div>

            <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Next Js</td>
                      <td>{blogData.filter(dat => dat.blogcategory[0] === "Next js").length}</td>
                    </tr>

                    <tr>
                      <td>React Js</td>
                      <td>{blogData.filter(dat => dat.blogcategory[0] === "React Js").length}</td>
                    </tr>

                    <tr>
                      <td>Cybersecurity</td>
                      <td>{blogData.filter(dat => dat.blogcategory[0] === "Cybersecurity").length}</td>
                    </tr>

                    <tr>
                      <td>DevOps</td>
                      <td>{blogData.filter(dat => dat.blogcategory[0] === "DevOps").length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>


        </div>
      </>
    </LoginLayout>
  );
}
