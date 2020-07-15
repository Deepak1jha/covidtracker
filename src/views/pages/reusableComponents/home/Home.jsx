import React from "react";
import {Col, Container, Row} from "reactstrap";
import axios from 'axios';
import AlternativeHeader from "../../../../components/Headers/AlternativeHeader";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactCountryFlag from "react-country-flag";
import {Chart} from "react-google-charts";
import {Link} from "react-router-dom";
import moment from "moment";
import {LineChart, PieChart} from "react-chartkick";
import 'chart.js'

const {SearchBar} = Search;

const countryColumns = [
  {
    dataField: 'country',
    text: 'country',
    sort: true,
    searchable: true
  },
  {
    dataField: 'cases',
    text: 'cases',
    searchable: true,
    sort: true,
  }, {
    dataField: 'active',
    text: 'active',
    sort: true,
    searchable: false,
    formatter: (cellContent => {
      return (
        <>
          <span className="name mb-0 text-sm"> {cellContent}</span>
        </>
      )
    })
  },
  {
    dataField: 'recovered',
    text: 'recovered',
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
    dataField: 'deaths',
    text: 'deaths',
    sort: true,
    searchable: false,
    formatter: (cellContent) => {
      if (cellContent < 1) {
        return (
          <h5>
            <span className="text-success"> {cellContent}</span>
          </h5>
        );
      }
      return (
        <h5>
          <span className="text-warning"> {cellContent}</span>
        </h5>
      );
    }
  },
  {
    dataField: 'continent',
    text: 'continent',
    searchable: false
  },
  {
    dataField: "countryInfo",
    text: 'Flag',
    searchable: false,
    formatter: (cellContent => {
      return (
        <div className="avatar-group">
          <img className="avatar center avatar-sm rounded-circle" alt="flag"
               src={cellContent.flag}
          />
        </div>
      )
    })
  },
  {
    dataField: 'countryInfo.iso2',
    text: 'Action',
    searchable: false,
    formatter: (cellContent) => {
      return (
        <>
          <Link
            className="btn-icon-only text-dark"
            to={`/country/${cellContent}`}>View</Link>
        </>
      );
    }
  }];

const options = {
  hideSizePerPage: true
}

const defaultSorted = [{
  dataField: 'cases',
  order: 'desc'
}];


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      activeCases: "",
      recovered: "",
      deaths: "",
      totalCases: "",
      ipAddress: "",
      countryName: "",
      worldwideTotalCases: "",
      worldwideActionCases: "",
      worldwideRecovered: "",
      worldwideDeaths: "",
      worldwideActiveCases: "",
      worldWideDataUpdated: "",
      countryCode: "",
      countryList: "",
      coronaHistory: [],
      newCases: "",
      newDeaths: "",
      newRecovered: "",
      newActiveCases: "",
      countryListNew: [],
      todayCases: "",
      todayRecovered: "",
      todayDeaths: "",
      updated: "",
    }
  }

  async componentDidMount() {

    await axios.get(`https://corona.lmao.ninja/v2/countries`).then(response => {
      this.setState({countryListNew: response.data});
    });

    await axios.get(`https://freegeoip.app/json/${this.state.ipAddress}`).then(response => {
      this.setState({userIpv4Detail: response.data});
      this.setState({countryName: response.data.country_name});
      this.setState({countryCode: response.data.country_code});
    });

    await axios.get(`https://api.covid19api.com/summary`).then(response => {
      const activeCase = response.data.Global.TotalConfirmed - (response.data.Global.TotalRecovered + response.data.Global.TotalDeaths);
      this.setState({worldwideTotalCases: response.data.Global.TotalConfirmed});
      this.setState({worldwideRecovered: response.data.Global.TotalRecovered});
      this.setState({worldwideDeaths: response.data.Global.TotalDeaths});
      this.setState({worldWideDataUpdated: response.data.lastUpdate});
      this.setState({worldwideActiveCases: activeCase});
      const list = response.data.Countries;
      const country = list.find((item) => {
        return item.CountryCode === `${this.state.countryCode}`;
      });
      const activeCaseInCountry = country.TotalConfirmed - (country.TotalRecovered + country.TotalDeaths);
      this.setState({recovered: country.TotalRecovered});
      this.setState({deaths: country.TotalDeaths});
      this.setState({updated: country.Date});
      this.setState({todayCases: country.NewConfirmed});
      this.setState({totalCases: country.TotalConfirmed});
      this.setState({todayDeaths: country.NewDeaths});
      this.setState({todayRecovered: country.NewRecovered});
      this.setState({activeCases: activeCaseInCountry});
      const newActiveCases = country.NewConfirmed - country.NewRecovered;
      this.setState({newActiveCases: newActiveCases});
    });

    await axios.get('https://api.covid19api.com/summary').then(response => {
      this.setState({countryList: response.data.Countries})
    });
    await axios.get(`https://api.covid19api.com/dayone/country/${this.state.countryCode}`).then(response => {
      this.setState({coronaHistory: response.data});
    });
  }

  countryCoronaCount() {
    let mapData = [
      ["Country", "cases"]
    ];
    for (let key in this.state.countryList) {
      mapData.push([`${this.state.countryList[key].CountryCode}`, `${this.state.countryList[key].TotalConfirmed}`]);
    }
    return mapData;
  }

  historyData() {
    const list = []
    let mapData = this.state.coronaHistory;
    for (let columnsKey in mapData) {
      if (moment(mapData[columnsKey].Date).date() % 2 === 0) {
        list.push([moment(mapData[columnsKey].Date).format("DD-MMMM"), mapData[columnsKey].Confirmed])
      }
    }
    return list
  }

  render() {
    const obj = this;
    return (
      <>
        <AlternativeHeader
          name="Corona Tracker"
        />
        <Container className="mt--12" fluid>
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <div className="card-stats card">
                <div className="card-body">
                  <div className="row">
                    <div className="col"><h5 className="text-uppercase text-muted mb-0 card-title">Total Case</h5>
                      <span className="h2 font-weight-bold mb-0">{this.state.totalCases}</span></div>
                    <div className="col-auto col">
                      <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow"><i
                        className="ni ni-chart-bar-32"/></div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm"><span className="text-success mr-2"><i
                    className="fa fa-arrow-up"/> {this.state.todayCases}</span> <span className="text-nowrap">Since Last Day </span>
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
                        className="ni ni-ambulance"/></div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm"><span className="text-success mr-2"><i
                    className="fa fa-arrow-up"/> {this.state.newActiveCases}</span> <span className="text-nowrap">Since Last Day </span>
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
                        className="ni ni-satisfied"/></div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm"><span className="text-success mr-2"><i
                    className="fa fa-arrow-up"/> {this.state.todayRecovered}</span> <span className="text-nowrap">Since last Day</span>
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
                      <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow"><i
                        className="ni ni-circle-08"/></div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm"><span className="text-success mr-2"><i
                    className="fa fa-arrow-up"/>{this.state.todayDeaths}</span> <span className="text-nowrap">Since last Day</span>
                  </p></div>
              </div>
            </div>
          </div>
          <Row>
            <Col>
              <div className="card">
                <div className="card-body">
                  <div className="my-4">
                    <PieChart
                      data={[["Total Case", `${this.state.totalCases}`], ["Deaths", `${this.state.deaths}`], ["Active Case", `${this.state.activeCases}`], ["Recovered", `${this.state.recovered}`]]}/>
                  </div>
                  <div className="row">
                    <div className="col">
                      <span
                        className="h6 surtitle float-xl-right text-muted">{moment(this.state.updated).fromNow()}</span>
                      <span className="d-block h3">{this.state.countryName} <ReactCountryFlag
                        countryCode={this.state.countryCode}/></span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="card">
                <div className="card-body">
                  <div className="my-4">
                    <PieChart
                      data={[["Total Case", `${this.state.worldwideTotalCases}`], ["Deaths", `${this.state.worldwideDeaths}`], ["Active Case", `${this.state.worldwideActiveCases}`], ["Recovered", `${this.state.worldwideRecovered}`]]}/>
                  </div>
                  <div className="row">
                    <div className="col">
                      <span
                        className="h6 surtitle float-xl-right text-muted">{moment(this.state.updated).fromNow()}</span>
                      <span className="d-block h3">Worldwide </span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="card">
            <div className="card-body">
              <div className="my-4">
                <LineChart colors={["#b00", "#666"]} xtitle="Time" ytitle="Cases" label="Cases" download={true}
                           adapter="chartjs" curve={true} thousands="," decimal="," round={2}
                           messages={{empty: "Loading..."}} data={obj.historyData()}/>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="my-4">
                <Chart chartType="GeoChart" width="100%" height="300px" data={obj.countryCoronaCount()}/>
              </div>
            </div>
          </div>
          <div className="card ">
            <div className="card-body  ">
              <div className="my-4 table-responsive overflow-hidden">
                <ToolkitProvider
                  keyField="id"
                  data={this.state.countryListNew}
                  columns={countryColumns}
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
                          keyField='country'
                          defaultSorted={defaultSorted}
                          pagination={paginationFactory(options)}
                        />
                      </div>
                    )
                  }
                </ToolkitProvider>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default Home;
