import React from "react";
import { Card, Icon, Image, Grid, Progress, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FundButton from "./FundButton";
import ProjectDetailsButton from "./ProjectDetailsButton";

const ProjectCard = props => {
  const { proj, total } = props;
  // console.log(proj)
  return (
    <Grid.Column>
      <Card>
        <Card.Content className="ui content">
          Project Created By:
          <Card.Content as={Link} to={{pathname: "/users/" + proj.User.id, state:{proj}}} >
            {proj.User ? proj.User.displayName : null}
          </Card.Content>
        </Card.Content>
        <Card.Content extra>
          <Image
            floated="right"
            size="small"
            src={"http://localhost:8080/" + proj.User.userImage}
          />
          <Card.Header>{proj.name}</Card.Header>
          <Card.Description>
            This student needs ${proj.goal} to get an education
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="money" />
          Total amount of backing money: ${total}
          <Progress percent={ (total/proj.goal) * 100 } indicating />
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <ProjectDetailsButton proj={proj} total={total} />
            {proj.funded === true ? <Button className="ui olive item">THIS PROJECT HAS BEEN FUNDED!</Button> : <FundButton project={proj} /> }
          </div>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default ProjectCard;
