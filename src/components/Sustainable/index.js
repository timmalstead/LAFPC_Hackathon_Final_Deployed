import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import SustainableData from "./SustainableData"
import EditSustainable from "./EditSustainable"
import SearchBar from "../SearchBar"
import CSVReader from "react-csv-reader"
import NewSustainableChart from "./NewSustainableChart"
import Button from "@material-ui/core/Button"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

import {
  Container,
  DivDataModal,
  ContainModal,
  Table,
  Row,
  TableData,
  TableDataHeader,
  TableDataButton,
  H1,
  P,
  ChartDiv,
  ToolKit
} from "./style"

import { DescribSec, DescribPar, DescribH1 } from "./style"

class Sustainable extends Component {
  state = {
    sustainableData: [],
    showEditModal: false,
    showDataModal: false,
    dataModalProperty: "",
    editData: {
      _id: null,
      value: "sustainable",
      indicator: "",
      baseline: "",
      update: "",
      sources: "",
      change: "",
      notes: "",
      dataStatus: "",
      group: "",
      error: ""
    },
    currentData: {},
    allData: []
  }

  componentDidMount = () => {
    this.getData()
  }

  filteredData = fil => {
    if (fil.length > 0) {
      this.setState({
        sustainableData: fil
      })
    } else {
      this.setState({
        sustainableData: [...this.state.allData]
      })
    }
  }

  getData = async () => {
    try {
      const data = await fetch(`/data/get-data`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const oldData = await data.json()
      const sustainData = oldData.data.filter(
        data => data.value === "sustainable"
      )
      this.setState({
        sustainableData: sustainData,
        currentData: sustainData[0]
      })
    } catch (err) {
      console.log(err)
    }
  }

  addData = async data => {
    try {
      const addDataResponse = await fetch(`/data/add-data`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedResponse = await addDataResponse.json()
      this.setState({
        sustainableData: [...this.state.sustainableData, parsedResponse.data]
      })
    } catch (err) {
      console.log(err, "this is error from add data")
    }
  }

  handleFormChange = e => {
    this.setState({
      editData: {
        ...this.state.editData,
        [e.target.name]: e.target.value
      }
    })
  }

  closeAndEdit = async e => {
    e.preventDefault()
    try {
      const editRequest = await fetch(
        `/data/${this.state.editData._id}/update-data`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(this.state.editData),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      if (editRequest.status !== 200) {
        throw Error("editResquest not working")
      }
      const editResponse = await editRequest.json()
      const editDataArray = this.state.sustainableData.map(data => {
        if (data._id === editResponse.data._id) {
          data = editResponse.data
        }
        return data
      })
      this.setState({
        sustainableData: editDataArray,
        showEditModal: false
      })
      this.props.history.push("/sustainable")
    } catch (err) {
      console.log(err, " error closeAndEdit")
      return err
    }
  }

  editData = data => {
    this.setState({
      showEditModal: !this.showEditModal,
      editData: data
    })
  }

  cancelEdit = () => {
    this.setState({
      showEditModal: false
    })
  }

  delete = async id => {
    try {
      const deleteData = await fetch(`/data/${id}`, {
        method: "DELETE",
        credentials: "include"
      })
      if (deleteData.status !== 200) {
        throw Error("Something happend on delete")
      }
      const deleteDataJson = await deleteData.json()
      this.setState({
        sustainableData: this.state.sustainableData.filter(
          data => data._id !== id
        )
      })
    } catch (err) {
      console.log(err)
      return err
    }
  }

  closeDataModal = () => {
    this.setState({
      showDataModal: false
    })
  }

  showData = currentData => {
    this.setState({
      currentData
    })
  }

  handleForce = async file => {
    const { sustainableData } = this.state
    const holder = []
    for (let i = 1; i < file.length; i++) {
      const newObj = {
        [file[0][0]]: file[i][0],
        [file[0][1]]: file[i][1],
        [file[0][2]]: file[i][2],
        [file[0][3]]: file[i][3],
        [file[0][4]]: file[i][4],
        [file[0][5]]: file[i][5]
      }
      holder.push(newObj)
    }
    this.setState({
      sustainableData: [...sustainableData, ...holder]
    })
    try {
      const whatsThis = await (
        await fetch(`/data/addingcsv`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(holder),
          headers: {
            "Content-Type": "application/json"
          }
        })
      ).json()
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const {
      sustainableData,
      editData,
      showEditModal,
      showDataModal,
      dataModalProperty,
      currentData
    } = this.state
    const { isLogged } = this.props.isLogged
    return (
      <Container>
        <div
          style={{
            display: "flex",
            marginTop: "50px",
            justifyContent: "space-between"
          }}
        >
          <DescribSec>
            <DescribH1>
              <h1>Sustainability</h1>
            </DescribH1>
            <DescribPar>
              Sustainable food systems ensure that food is grown, processed,
              distributed, and recycled in ways that are environmentally
              responsible, equitable, and economically viable for current and
              future generations.
            </DescribPar>

            <DescribPar>
              Sustainability: While micro-farms are on the rise, so are large
              farms, while mid-sized farms remain stagnant in number and
              percentage, and small farms are rapidly decreasing in acres
              harvested. We also see that women- and minority-operated farms are
              increasing in the LA foodshed.
            </DescribPar>

            <DescribPar>
              Environmental stewardship and regenerative agriculture are
              practiced through growing and business practices that avoid harm
              to our air, soil, seeds, and water, and renew the resources needed
              to feed our population.
            </DescribPar>
          </DescribSec>
          <DescribSec>
            <ChartDiv>
              <ToolKit>
                <h3>ToolKit</h3>
                <Button
                  style={{ backgroundColor: "#8BC147", marginTop: "10px" }}
                  fullWidth
                >
                  Full Report
                </Button>
                <Button
                  style={{ backgroundColor: "#8BC147", marginTop: "10px" }}
                  fullWidth
                >
                  Fast Facts
                </Button>
                <Button
                  style={{ backgroundColor: "#8BC147", marginTop: "10px" }}
                  fullWidth
                >
                  Case Studies
                </Button>
                <Button
                  style={{ backgroundColor: "#8BC147", marginTop: "10px" }}
                  fullWidth
                >
                  Expert Commentaries
                </Button>
                <Button
                  style={{ backgroundColor: "#8BC147", marginTop: "10px" }}
                  fullWidth
                >
                  Interview Videos
                </Button>
              </ToolKit>
            </ChartDiv>
          </DescribSec>
        </div>
        {showEditModal ? (
          <EditSustainable
            cancelEdit={this.cancelEdit}
            closeAndEdit={this.closeAndEdit}
            editData={editData}
            handleFormChange={this.handleFormChange}
          />
        ) : null}
        {showDataModal ? (
          <DivDataModal onClick={() => this.closeDataModal()}>
            <ContainModal>{dataModalProperty}</ContainModal>
          </DivDataModal>
        ) : null}
        {Object.keys(currentData).length ? (
          <ToolKit>
            <NewSustainableChart
              sustainableData={sustainableData}
              currentData={currentData}
            />
          </ToolKit>
        ) : null}
        <SearchBar searching={this.state} set={this.filteredData} />
        <Row>
          {/* {this.props.isLogged ? (
            <TableDataHeader>ADMIN</TableDataHeader>
          ) : null} */}
          <TableDataHeader>
            <H1>Indicator</H1>
          </TableDataHeader>
          <TableDataHeader>
            <H1>2013</H1>
          </TableDataHeader>
          <TableDataHeader>
            <H1>2017</H1>
          </TableDataHeader>
          <TableDataHeader>
            <H1>2020</H1>
          </TableDataHeader>
        </Row>
        <Table>
          {sustainableData.map((data, i) => {
            return (
              <Row key={i}>
                {this.props.isLogged ? (
                  <TableDataButton>
                    <Button onClick={() => this.editData(data)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => this.delete(data._id)}>
                      <DeleteIcon />
                    </Button>
                  </TableDataButton>
                ) : null}
                <TableData onClick={() => this.showData(data)}>
                  <P>{data.indicator}</P>
                </TableData>
                <TableData onClick={() => this.showData(data)}>
                  <P>{data[2013]}</P>
                </TableData>
                <TableData onClick={() => this.showData(data)}>
                  <P>{data[2017]}</P>
                </TableData>
                <TableData onClick={() => this.showData(data)}>
                  <P>{data[2020]}</P>
                </TableData>
              </Row>
            )
          })}
        </Table>
        {this.props.isLogged ? (
          <div style={{ marginBottom: "5rem" }}>
            <SustainableData addData={this.addData} />
            <CSVReader
              cssClass="csv-reader-input"
              label="Upload"
              onFileLoaded={this.handleForce}
              onError={this.handleDarkSideForce}
              inputId="ObiWan"
              inputStyle={{ color: "red" }}
            />
          </div>
        ) : null}
      </Container>
    )
  }
}

export default withRouter(Sustainable)
