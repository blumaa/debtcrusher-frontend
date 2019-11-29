import React from "react";
import { Card, Icon, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FundButton from "./FundButton";
import ProjectDetailsButton from "./ProjectDetailsButton";

const ProjectCard = props => {
  const { proj, total } = props;

  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          Project Created By:
          <Card.Content as={Link} to={proj.User ? "/users/" + proj.User.id : ""}>
            {proj.User ? proj.User.displayName : null}
          </Card.Content>
        </Card.Content>
        <Card.Content extra>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          />
          <Card.Header>{proj.name}</Card.Header>
          <Card.Description>
            This student needs ${proj.goal} to get an education
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="money" />
          Total amount of backing money: ${total}
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <ProjectDetailsButton proj={proj} total={total} />
            <FundButton project={proj} />
          </div>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default ProjectCard;
