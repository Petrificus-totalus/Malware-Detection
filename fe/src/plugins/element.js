import Vue from "vue";
import {
  Menu,
  Submenu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  Icon,
  Button,
  Dialog,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Footer,
  Main,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option,
  Upload,
  Progress,
  Loading,
  Link,
  PageHeader,
  Drawer,
  Radio,
  RadioGroup,
  RadioButton,
  DatePicker,
  Badge,
  Collapse,
  CollapseItem,
} from "element-ui";

Vue.use(Menu);

Vue.use(RadioButton);

Vue.use(Badge);
Vue.use(Collapse);
Vue.use(CollapseItem);

Vue.use(DatePicker);
Vue.use(Checkbox);

Vue.use(PageHeader);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(RadioGroup);

Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Loading);
Vue.use(Link);

Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Select);
Vue.use(Option);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
