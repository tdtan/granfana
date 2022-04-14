import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './datasource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';
import { Select, Checkbox, InlineFormLabel } from '@grafana/ui';
import { Collapse } from '@grafana/ui';
import './index.css';
const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, queryText: event.target.value });
  };

  onConstantChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, time: parseFloat(event.target.value) });
    // executes the query
    onRunQuery();
  };
  state = {
    usingGlobalTime: false,
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { time, minYAxis, maxYAxis } = query;
    const optionTime = [
      { label: 'Past 5m', value: 0 },
      { label: 'Past 15m', value: 1 },
      { label: 'Past 30m', value: 2 },
      { label: 'Past 1h', value: 3 },
      { label: 'Past 3h', value: 4 },
      { label: 'Past 12h', value: 5 },
      { label: 'Past 1d', value: 5 },
      { label: 'Past 3d', value: 6 },
    ];
    const optionChart = [
      { label: 'Column', value: 0 },
      { label: 'Line', value: 1 },
      { label: 'Area', value: 2 },
    ];
    const optionColor = [
      { label: 'classic', value: 0 },
      { label: 'cool', value: 1 },
      { label: 'warm', value: 2 },
    ];
    const optionLineStyle = [
      { label: 'Solid', value: 0 },
      { label: 'Dotted', value: 1 },
      { label: 'Dashed', value: 2 },
    ];
    const optionLineStroke = [
      { label: 'Normal', value: 0 },
      { label: 'Thin', value: 1 },
      { label: 'Thick', value: 2 },
    ];
    return (
      <>
        <Collapse label="Metrics" />
        <div className="gf-form mt-10">
          <InlineFormLabel children="Metrics" />
          <Select onChange={() => console.log('Selett changed')} />
        </div>
        <div className="gf-form mt-10">
          <Checkbox label="Using Global Times" />
          <Select onChange={() => console.log('Time', time)} options={optionTime} />
        </div>
        <Collapse label="Chart" />
        <div className="gf-form mt-10">
          <InlineFormLabel children="Visualization" />
          <Select onChange={() => console.log('Time', time)} options={optionChart} />
          <InlineFormLabel children="Color" />
          <Select onChange={() => console.log('Time', time)} options={optionColor} />
        </div>
        <div className="gf-form mt-10">
          <InlineFormLabel children="Line Style" />
          <Select onChange={() => console.log('Time', time)} options={optionLineStyle} />
          <InlineFormLabel children="Line Stroke" />
          <Select onChange={() => console.log('Time', time)} options={optionLineStroke} />
        </div>
        <div className="gf-form mt-10">
          <FormField
            labelWidth={8}
            value={minYAxis || ''}
            onChange={this.onQueryTextChange}
            type="number"
            label="Min"
            tooltip="Not used yet"
          />
          <FormField
            labelWidth={8}
            value={maxYAxis || ''}
            onChange={this.onQueryTextChange}
            type="number"
            label="Max"
            tooltip="Not used yet"
          />
        </div>
      </>
    );
  }
}
