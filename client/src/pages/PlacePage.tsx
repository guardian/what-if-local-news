import React from "react";
import { getPlace } from "../services/CouncillorService";
import { Place } from "../services/places";
import { useAsync } from "../hooks/useAsync";
import PlaceGraph from "../PlaceGraph";
import Paper from "../Paper";
import InfoPage from "../InfoPage";
import { SidebarTitle } from "../SidebarTitle";
import Title from "../Title";

type PlacePageProps = {
  id: string;
};

const PlacePage = ({ id }: PlacePageProps) => {
  const [place] = useAsync(
    (id: string) => getPlace(id).then(res => res.results),
    null as Place | null | undefined,
    id
  );

  if (place === null) {
    return <>Loading ...</>;
  } else if (typeof place === "undefined") {
    return <>Not found</>;
  }

  return (
    <InfoPage
      sidebar={
        <>
          <SidebarTitle>Connected documents</SidebarTitle>
          <Paper>
            {/* {<PlaceGraph
              place={place}
              style={{
                height: "300px",
                width: "100%",
                borderBottom: "1px solid black"
              }}
            />} */}
          </Paper>
        </>
      }
    >
      <Title dark>{place.name}</Title>
    </InfoPage>
  );
};

export default PlacePage;
