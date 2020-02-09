import React from "react";
import { Card, Icon, Image, Grid, Progress, Button, Segment, Divider, Header } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import FundButton from "./FundButton";
import ProjectDetailsButton from "./ProjectDetailsButton";

const ProjectCard = props => {
  // console.log(props.history)
  const { proj, total, history } = props;
  const totalHelpToOtherProjects = total * .1
  const vidSplit1 = proj.video_url.split("/")
  const vidSplit2 = vidSplit1[1].split("&")

  // console.log(proj, history)
  console.log(proj)
  return (
    <Grid.Column>
      <Card fluid>
        <Card.Content className="ui content" textAlign="center">
          <div className="card title">{proj.name}</div>


        </Card.Content>

        <Card.Content textAlign="center">

          <Segment>

            <Grid columns="equal" verticalAlign='middle' >
              <Grid.Row>
                <Grid.Column>
                  <iframe width="100%" height="100%" src={"https://www.youtube.com/embed/" + vidSplit1[3]} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Card.Description className="card description">Original student loan debt: <Header className="ui red item">${proj.goal}</Header></Card.Description>
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </Segment>
          Project Created By:
          <Card.Content as={Link} to={{pathname: "/users/" + proj.User.id, state:{proj}}} >
            {proj.User ? proj.User.displayName : null}
          </Card.Content>
          <Divider />
          <Card.Description >
            {proj.description}
          </Card.Description>
        </Card.Content>

        <Card.Content extra textAlign="center">
          <Segment>
            <Card.Description className="card description">I only need ${proj.current_goal} to reach my goal!</Card.Description>

          <Progress
            percent={(total / proj.current_goal) * 100}
            indicating
          />
        <Icon name="money" />
        Total amount of backing money: ${total}
        </Segment>
        </Card.Content>
        <Card.Content extra textAlign="center">

          People helping this loan are also giving ${totalHelpToOtherProjects} to other student's loans.
        </Card.Content>

        <Card.Content extra>
          <div className="ui two buttons">
            {/*<ProjectDetailsButton proj={proj} total={total} />*/}
            { proj.funded === true ? <Button className="ui olive item">THIS PROJECT HAS BEEN FUNDED!</Button> : <FundButton project={proj} history={history}/> }
          </div>
        </Card.Content>
      </Card>

    </Grid.Column>
  );
};

export default ProjectCard;
