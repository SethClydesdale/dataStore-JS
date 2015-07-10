// Methods to make expirable web storage super short and easy
// Developed by Seth Clydesdale (https://github.com/SethClydesdale/dataStore-JS)
(function() {
  if (typeof dataStore === 'undefined') {
    
    window.dataStore = {
      on : window.localStorage ? true : false,
      
      set : function(name, value, exp) {
        if (dataStore.on) {
          window.localStorage[name] = value;
          if (exp) window.localStorage[name + 'Exp'] = +new Date + '|' + exp;
        }
      },
    
      get : function(name) {
        var o = {
          value : null,
          exp : null
        };
        
        if (dataStore.on) {
          var exp = window.localStorage[name + 'Exp'];
          if (exp) {
            exp = exp.split('|');
            exp = exp.length == 2 ? +exp[0] - (+new Date - +exp[1]) : 0;
          }
          
          o.value = window.localStorage[name] || '';
          o.exp = exp > 0 ? exp : 0;
        }
        
        return o;
      },
      
      del : function(name) {
        if (dataStore.on && window.localStorage[name]) {
          window.localStorage.removeItem(name);
          window.localStorage.removeItem(name + 'Exp');
        }
      }
    };
    
  } else console && console.warn('dataStore is already initialized');
})();
