var express        = require('express')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http')
  , path           = require('path')
  , db             = require('./models')


var app = express()

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + 'app/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(__dirname,'/'));

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler())
}

app.get('/customers/:id', function(req, res) {
  var customerId = parseInt(req.params.id);
  var data = {};
  for (var i=0,len=customers.length;i<len;i++) {
    if (customers[i].id === customerId) {
      data = customers[i];
      break;
    }
  }
  res.json(data);
});

app.get('/customers', function(req, res) {
  res.json(customers);
  //res.json(500, { error: 'An error has occurred!' });
});

app.get('/orders', function(req, res) {
  var orders = [];
  for (var i=0,len=customers.length;i<len;i++) {
    if (customers[i].orders) {
      for (var j=0,ordersLen=customers[i].orders.length;j<ordersLen;j++) {
        orders.push(customers[i].orders[j]);
      }
    }
  }
  res.json(orders);
});

app.delete('/customers/:id', function(req, res) {
  var customerId = parseInt(req.params.id);
  var data = { status: true };
  for (var i=0,len=customers.length;i<len;i++) {
    if (customers[i].id === customerId) {
      customers.splice(i,1);
      data = { status: true };
      break;
    }
  }
  res.json(data);
});
var customers = [
  {
    id: 1,
    joined: '2000-12-02',
    name:'John',
    city:'Chandler',
    orderTotal: 9.9956,
    orders: [
      {
        id: 1,
        product: 'Shoes',
        total: 9.9956
      }
    ]
  },
  {
    id: 2,
    joined: '1965-01-25',
    name:'Zed',
    city:'Las Vegas',
    orderTotal: 19.99,
    orders: [
      {
        id: 2,
        product: 'Baseball',
        total: 9.995
      },
      {
        id: 3,
        product: 'Bat',
        total: 9.995
      }
    ]
  },
  {
    id: 3,
    joined: '1944-06-15',
    name:'Tina',
    city:'New York',
    orderTotal:44.99,
    orders: [
      {
        id: 4,
        product: 'Headphones',
        total: 44.99
      }
    ]
  },
  {
    id: 4,
    joined: '1995-03-28',
    name:'Dave',
    city:'Seattle',
    orderTotal:101.50,
    orders: [
      {
        id: 5,
        product: 'Kindle',
        total: 101.50
      }
    ]
  }
];


db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })
