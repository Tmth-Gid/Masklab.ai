import React from "react";
import "../../index.css";
import "./ViewPanel.css"
import {Pie} from "react-chartjs-2";

export class StatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let arrayPeopleMask = Object.values(this.props.data.class)
        if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
            this.setState({
                data: {
                    labels: ['Avec masque', 'Sans masque'],
                    datasets: [
                        {
                            data: [
                                arrayPeopleMask.filter(element => element === 0).length,
                                arrayPeopleMask.filter(element => element === 1).length
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)'
                            ]
                        },
                    ],
                }
            })
        }
    }


    render() {
        return (
            <div className="statComponentSection">
                <h2 className="titleStat">Statistiques</h2>
                <div className="containerStats">
                    <div className="pie">
                        <Pie
                            data={this.state.data}
                            options={{
                                animation: {
                                    duration: 0
                                },
                            }}
                            height={200}
                            width={200}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


