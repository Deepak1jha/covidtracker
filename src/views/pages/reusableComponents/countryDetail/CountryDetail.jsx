import React from "react";
import axios from "axios";
import AlternativeHeader from "../../../../components/Headers/AlternativeHeader";
import {CardBody, Container} from "reactstrap";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from "moment";
import {v4 as uuidv4} from "uuid";
import {LineChart} from "react-chartkick";
import 'chart.js'

const {getName} = require('country-list');
const {SearchBar} = Search;
const columns = [
  {
    dataField: 'province',
    text: 'province',
    sort: true,
    searchable: true
  },
  {
    dataField: 'stats.confirmed',
    text: 'confirmed',
    sort: true,
    searchable: false,
    formatter: (cellContent) => {
      if (cellContent < 1) {
        return (
          <h5>
            <span className="text-warning"> No Data</span>
          </h5>
        );
      }
      return (
        <h5>
          <span className="text-success"> {cellContent}</span>
        </h5>
      );
    }
  },
  {
    dataField: 'stats.recovered',
    text: 'Recovered',
    sort: true,
    searchable: false,
    formatter: (cellContent => {
      if (cellContent < 1) {
        return (
          <>
            <span className="name mb-0 text-sm text-danger"> Unavailable</span>
          </>
        )
      } else {
        return (
          <>
            <span className="name mb-0 text-sm text-success"> {cellContent}</span>
          </>
        )
      }
    })
  },
  {
    dataField: 'stats',
    text: 'Deaths',
    sort: true,
    searchable: false,
    formatter: (cellContent => {
      return (
        <>
          <span className="name mb-0 text-s align-items-center text-warning">{cellContent.deaths}</span>
        </>
      )
    })
  }
];
const options = {
  hideSizePerPage: true
}

const defaultSorted = [{
  dataField: 'stats.confirmed',
  order: 'desc'
}];

class CountryDetail extends React.Component {

  constructor() {
    super();
    this.state = {
      recovered: "",
      activeCases: "",
      deaths: "",
      totalCases: "",
      provinceList: [],
      countryCoronaHistory: [],
      flag: "",
      tests: "",
      critical: "",
      population: "",
      testsPerMillion: "",
      activePerMillion: "",
      casesPerMillion: "",
      todayCases: "",
      todayRecovered: "",
      todayDeaths: "",
      newActiveCases: "",
    }
  }

  async componentDidMount() {
    const {uniqueId} = this.props.match.params;
    await axios.get(`https://corona.lmao.ninja/v2/jhucsse`).then(response => {
      let list = []
      list = response.data;
      const countryProvinces = list.filter((item) => {
        return item.country === uniqueId || item.country === getName(uniqueId)
      });
      this.setState({provinceList: countryProvinces})
    });

    await axios.get(`https://corona.lmao.ninja/v2/countries/${uniqueId}`).then(response => {
      this.setState({flag: response.data.countryInfo.flag});
      this.setState({activeCases: response.data.active});
      this.setState({tests: response.data.tests});
      this.setState({critical: response.data.critical});
      this.setState({population: response.data.population});
      this.setState({testsPerMillion: response.data.testsPerOneMillion});
      this.setState({activePerMillion: response.data.activePerOneMillion});
      this.setState({casesPerMillion: response.data.casesPerOneMillion});
    });

    await axios.get(`https://api.covid19api.com/summary`).then(response => {
      const list = response.data.Countries;
      const country = list.find((item) => {
        return item.CountryCode === uniqueId;
      });
      this.setState({totalCases: country.TotalConfirmed});
      this.setState({todayCases: country.NewConfirmed});
      this.setState({recovered: country.TotalRecovered});
      this.setState({deaths: country.TotalDeaths});
      this.setState({todayRecovered: country.NewRecovered});
      this.setState({todayDeaths: country.NewDeaths});
      const activeCaseInCountry = country.NewConfirmed - (country.NewRecovered + country.NewDeaths);
      this.setState({newActiveCases: activeCaseInCountry});
    });

    await axios.get(`https://api.covid19api.com/dayone/country/${uniqueId}`).then(response => {
      this.setState({countryCoronaHistory: response.data})
      console.table(response.data)
    });
  }

  historyData() {
    const list = []
    let mapData = this.state.countryCoronaHistory;
    for (let columnsKey in mapData) {
      if (moment(mapData[columnsKey].Date).date() % 2 === 0) {
        list.push([moment(mapData[columnsKey].Date).format("DD-MMMM"), mapData[columnsKey].Confirmed])
      }
    }
    return list
  }

  render() {
    const {uniqueId} = this.props.match.params;
    const obj = this;
    return (
      <>
        <AlternativeHeader
          name={moment().format(`LLLL`)}
          parentName=""
          heading={getName(uniqueId)}
        />
        <Container className="mt--12" fluid>
          {/*<Doughnut data={ddata}/>*/}
          {/*<Pie data={ddata}/>*/}
          {/*<Line data={obj.chartData()}/>*/}

          <div className="row">
            <div className="col-md-6 col-xl-3">
              <div className="card-stats card">
                <div className="card-body">
                  <div className="row">
                    <div className="col"><h5 className="text-uppercase text-muted mb-0 card-title">Total Case</h5>
                      <span className="h2 font-weight-bold mb-0">{this.state.totalCases}</span></div>
                    <div className="col-auto col">
                      <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow"><i
                        className="ni ni-active-40"/></div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm"><span className="text-success mr-2"><i
                    className="fa fa-arrow-up"/> {this.state.todayCases}</span> <span
                    className="text-nowrap">Today</span>
                  </p></div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card-stats card">
                <div className="card-body">
                  <div className="row">
                    <div className="col"><h5 className="text-uppercase text-muted mb-0 card-title">Active Cases</h5>
                      <span
                        className="h2 font-weight-bold mb-0">{this.state.activeCases}</span></div>
                    <div className="col-auto col">
                      <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow"><i
                        className="ni ni-chart-pie-35"/></div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm"><span className="text-success mr-2"><i
                    className="fa fa-arrow-up"/>{this.state.newActiveCases}</span> <span
                    className="text-nowrap">Today</span>
                  </p></div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card-stats card">
                <div className="card-body">
                  <div className="row">
                    <div className="col"><h5 className="text-uppercase text-muted mb-0 card-title">Recovered</h5><span
                      className="h2 font-weight-bold mb-0">{this.state.recovered}</span></div>
                    <div className="col-auto col">
                      <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow"><i
                        className="ni ni-money-coins"/></div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm"><span className="text-success mr-2"><i
                    className="fa fa-arrow-up"/> {this.state.todayRecovered}</span> <span
                    className="text-nowrap">Today</span>
                  </p></div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card-stats card">
                <div className="card-body">
                  <div className="row">
                    <div className="col"><h5 className="text-uppercase text-muted mb-0 card-title">Deaths</h5><span
                      className="h2 font-weight-bold mb-0">{this.state.deaths}</span></div>
                    <div className="col-auto col">
                      <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow"><i
                        className="ni ni-chart-bar-32"/></div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm"><span className="text-success mr-2"><i
                    className="fa fa-arrow-up"/>{this.state.todayDeaths}</span> <span
                    className="text-nowrap">Today</span>
                  </p></div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="my-4">
                <LineChart colors={["#b00", "#666"]} xtitle="Time" ytitle="Cases" label="Cases" download={true}
                           adapter="chartjs" curve={true} thousands="," decimal="," round={2}
                           messages={{empty: "Loading..."}} data={obj.historyData()}/>
              </div>
            </div>
          </div>
          <div>
            <div className="card-testimonial card ">
              <div className="card-body pl-xl-9">
                <div id="info-areas">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-primary"><i className="fa fa-child"/></div>
                        <div className="description"><h5 className="info-title">Total Tests</h5>
                          <p>{this.state.tests}</p></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-warning"><i className="fa fa-bed"/></div>
                        <div className="description"><h5 className="info-title">Critical</h5>
                          <p>{this.state.critical}</p></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-danger"><i className="fa fa-users"/></div>
                        <div className="description"><h5 className="info-title">Population</h5>
                          <p>{this.state.population}</p></div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-primary"><i className="fa fa-braille"/></div>
                        <div className="description"><h5 className="info-title">Tests Per Million</h5>
                          <p>{this.state.testsPerMillion}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-warning"><i className="fa fa-h-square"/></div>
                        <div className="description"><h5 className="info-title">Active Per Million</h5>
                          <p>{this.state.activePerMillion}</p></div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-danger"><i className="fa fa-stethoscope"/></div>
                        <div className="description"><h5 className="info-title">Cases Per Million</h5>
                          <p>{this.state.casesPerMillion}</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-testimonial card ">
            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={this.state.provinceList}
                columns={columns}
                search
              >
                {
                  props => (
                    <div>
                      <h3>Search</h3>
                      <SearchBar {...props.searchProps} />
                      <hr/>
                      <BootstrapTable
                        {...props.baseProps}
                        loading={true}
                        bootstrap4={true}
                        hover={true}
                        id={uuidv4()}
                        keyField='province'
                        defaultSorted={defaultSorted}
                        pagination={paginationFactory(options)}
                      />
                    </div>
                  )
                }
              </ToolkitProvider>
            </CardBody>
          </div>
        </Container>
      </>
    );
  }
}

export default CountryDetail;
