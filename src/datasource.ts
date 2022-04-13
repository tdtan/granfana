// import defaults from 'lodash/defaults';
import { getBackendSrv } from "@grafana/runtime"

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';

// import { MyQuery, MyDataSourceOptions, defaultQuery } from './types';
import { MyQuery, MyDataSourceOptions} from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
  }

  // async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
  //   const { range } = options;
  //   const from = range!.from.valueOf();
  //   const to = range!.to.valueOf();

  //   // Return a constant for each query.
  //   const data = options.targets.map(target => {
  //     const query = defaults(target, defaultQuery);
  //     return new MutableDataFrame({
  //       refId: query.refId,
  //       fields: [
  //         { name: 'Time', values: [from, to], type: FieldType.time },
  //         { name: 'Value', values: [query.constant, query.constant], type: FieldType.number },
  //       ],
  //     });
  //   });

  //   return { data };
  // }
  async doRequest(query: MyQuery) {
    const result = await getBackendSrv().datasourceRequest({
      method: "GET",
      url: "https://api.cloud-vista.co",
      params: query,
    })
  
    return result;
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.map((query) =>
      this.doRequest(query).then((response) => {
        const frame = new MutableDataFrame({
          refId: query.refId,
          fields: [
            { name: "Time", type: FieldType.time },
            { name: "Value", type: FieldType.number },
          ],
        });
  
        response.data.forEach((point: any) => {
          frame.appendRow([point.time, point.value]);
        });
  
        return frame;
      })
    );
  
    return Promise.all(promises).then((data) => ({ data }));
  }
  async testDatasource() {
    // Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
