import React, { Component } from "react"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Grid from "@material-ui/core/Grid"
import { Link as LinkRoute } from "react-router-dom"
import Button from "@material-ui/core/Button"
class Navbar extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            style={{ marginLeft: "30px", marginRight: "30px" }}
          >
            <ButtonGroup
              fullWidth
              aria-label="full width outlined button group"
            >
              <Button
                size="large"
                className="nav-button"
                component={LinkRoute}
                to="/sustainable"
                style={{
                  backgroundColor: "rgba(0, 140, 14, 0.1)",
                  color: "#008c0e",
                  fontWeight: "bold"
                }}
              >
                Sustainability
              </Button>
              <Button
                className="nav-button"
                component={LinkRoute}
                to="/healthy"
                style={{
                  backgroundColor: "rgba(0, 143, 170, 0.1)",
                  color: "#008faa",
                  fontWeight: "bold"
                }}
              >
                Health
              </Button>
              <Button
                className="nav-button"
                component={LinkRoute}
                to="/affordable"
                style={{
                  backgroundColor: "rgba(222, 108, 24, 0.1)",
                  color: "#de6c1a",
                  fontWeight: "bold"
                }}
              >
                Affordability
              </Button>
              <Button
                className="nav-button"
                component={LinkRoute}
                to="/fair"
                style={{
                  backgroundColor: "rgba(156, 68, 89, 0.1)",
                  color: "#9c4459",
                  fontWeight: "bold"
                }}
              >
                Fairness
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default Navbar
