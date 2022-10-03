import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props)

    this.state= {
        employees: []
    }
    this.addEmployee = this.addEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  updateEmployee(id){
    this.props.history.push(`/update-employee/${id}`);
  }
  componentDidMount(){
    EmployeeService.getEmployees().then((res) => {
        this.setState({ employees: res.data });
    });
  }
  deleteEmployee(id){
    EmployeeService.deleteEmployee(id).then(res => {
      this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
    })
  }
  viewEmployee(id){
    this.props.history.push(`/view-employee/${id}`);
  }
  
  addEmployee() {
    this.props.history.push(`/add-employee`);
  }
  render() {
    return (
      <div>
        <h2 className="text-center">Employee List</h2>
        <div className="row">
          
          <button className="btn btn-primary col-3 my-3" 
          onClick={this.addEmployee}
          >
            Add Employee
          </button>
        </div>
        <div className = "row">
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.employees.map(
                            employee => 
                            <tr key = {employee.id}>
                                <td>{ employee.firstName }</td>
                                <td>{ employee.lastName }</td>
                                <td>{ employee.emailId }</td>
                                <td>
                                  <button onClick={() => this.updateEmployee(employee.id)} 
                                  className="btn btn-info"
                                  >
                                    Update
                                  </button>
                                  <button onClick={() => this.deleteEmployee(employee.id)} 
                                  className="btn btn-danger mx-1"
                                  >
                                    Delete
                                  </button>
                                  <button onClick={() => this.viewEmployee(employee.id)} 
                                  className="btn btn-info mx-1"
                                  >
                                    View
                                  </button>

                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </div>
    )
  }
}
export default ListEmployeeComponent;