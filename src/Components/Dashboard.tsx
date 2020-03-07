import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

interface propertyObj {
  id: string;
  name: string;
  imgUrl: string;
  group: string;
  averagePrice: number;
  soldOutCommunities: string;
}

interface homeObj {
  id: string;
  communityId: string;
  price: number;
  area: number;
  type: string;
}

const Dashboard = () => {
  //using state for communities and homes
  const [communities, setCommunities] = useState<
    Array<propertyObj> | Array<propertyObj>
  >([]);

  const [homes, setHomes] = useState<Array<homeObj> | Array<homeObj>>([]);

  //function to get data from api
  const fetchData = () => {
    //  setting communitesUrl and homesURL variables as links
    const communitiesURL =
      "https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities";
    const homesURL =
      "https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes";

    // using axios.get to get both variables and setting it to variables
    const getCommunities = axios.get(communitiesURL);
    const getHomes = axios.get(homesURL);

    // axios.all is responsible for running both requests and axios.spread is using the spread operator to expand the arrays
    axios.all([getCommunities, getHomes]).then(
      axios.spread((...allData) => {
        // getting community data i.e: names of communities images
        const communityData = allData[0].data;
        // getting home data i.e: communityids, prces, areas, types
        const homeData = allData[1].data;

        // attaching average prices into communityData
        attachAveragePrice(communityData, homeData);
      })
    );
  };
  // function to render cards with proper data for each card
  const renderCards = (card: propertyObj, index: number) => {
    // if card image url is empty or doesn't exist return no image available image
    if (card.imgUrl === "" || !card.imgUrl) {
      card.imgUrl =
        "https://cdn.shopify.com/s/files/1/0231/7685/t/3/assets/no-image-available.png?79";
    }
    return (
      // rendering card of image, community name and, average community price
      <ReactBootStrap.Card key={index} style={{ width: "18rem" }}>
        <ReactBootStrap.Card.Img
          variant="top"
          src={card.imgUrl}
          draggable="false"
          height="200px"
        />
        <ReactBootStrap.Card.Body>
          <ReactBootStrap.Card.Title>{card.name}</ReactBootStrap.Card.Title>
          <ReactBootStrap.Card.Text>
            {isNaN(card.averagePrice)
              ? "Price not available"
              : "$" + card.averagePrice}
          </ReactBootStrap.Card.Text>
        </ReactBootStrap.Card.Body>
      </ReactBootStrap.Card>
    );
  };

  //function to alphabetically sorting communities
  const alphabeticalSort = (property: string) => {
    let sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return (a: propertyObj, b: propertyObj): number => {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  };
  // function to attach average price to community data and rounding values
  const attachAveragePrice = (
    communityData: Array<propertyObj>,
    homesData: Array<homeObj>
  ) => {
    for (let k = 0; k < communityData.length; k++) {
      let totalPrice = 0;
      let numOfHouses = 0;
      for (let i = 0; i < homesData.length; i++) {
        if (communityData[k].id === homesData[i].communityId) {
          totalPrice += homesData[i].price;
          numOfHouses += 1;
        }
      }
      communityData[k].averagePrice = Math.round(totalPrice / numOfHouses);
    }

    setCommunities(communityData);
    setHomes(homesData);
  };

  // using useeffect to run fetchdata function
  useEffect(() => {
    fetchData();
  }, []);
  // sorting communities in alphabetical form using value "name"
  communities.sort(alphabeticalSort("name"));
  return (
    <div className="container">
      <h1>Communities</h1>
      <div className="grid">{communities.map(renderCards)}</div>
    </div>
  );
};

export default Dashboard;
