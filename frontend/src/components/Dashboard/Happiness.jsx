import React, { useState, useEffect } from "react";
import "./DashboardSections.scss";
import axiosJSONInst from "../../AxiosJSON";
import { HorizontalGridLines, VerticalBarSeries, XAxis, XYPlot } from "react-vis";
import { selectUID } from "../../app/reducers/UserSlice";
import { useSelector } from "react-redux";

const Happiness = () => {
  const userId = useSelector(selectUID);
  const [happiness, setHappiness] = useState(null);

  useEffect(() => {
    if (userId) {
      axiosJSONInst.get("/sentiment/" + userId).then((res) => {
        console.log(res);
        if (res.data !== null) {
          setHappiness(res.data);
        }
      });
    }
  }, [userId]);

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="dashboard-section happiness">
      <div className="section-header">
        <p className="title">Happiness</p>
        <p>
          Take a look at your score from the past week. Your wadle will recieve this data so they
          can support you!
        </p>
      </div>
      <div className="section-body flex-c">
        {happiness && (
          <XYPlot className={"happiness-plot"} width={275} height={180}>
            <HorizontalGridLines tickTotal={3} />
            <XAxis tickFormat={(v) => days[v]} tickSize={0} />
            <VerticalBarSeries
              barWidth={0.5}
              className="happiness-bars"
              color={"#499FB7"}
              data={happiness}
            />
          </XYPlot>
        )}
        <div className="btn btn-primary--blue-dark">Read detailed analytics</div>
      </div>
    </div>
  );
};

export default Happiness;
