import IntegralRecordList from '@components/IntegralRecordList';
import { Component } from 'vue-property-decorator';
import BaseVue from '@helpers/BaseVue';

@Component({
  name: 'integralRecord',
  components: {
    IntegralRecordList,
  },
})
export default class IntegralRecordPage extends BaseVue {};
