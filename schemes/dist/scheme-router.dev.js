"use strict";

var express = require('express');

var Schemes = require('./scheme-model');

var router = express.Router();
router.get('/', function (req, res) {
  Schemes.find().then(function (schemes) {
    res.json(schemes);
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to get schemes'
    });
  });
});
router.get('/:id', function (req, res) {
  var id = req.params.id;
  Schemes.findById(id).then(function (scheme) {
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({
        message: 'Could not find scheme with given id.'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to get schemes'
    });
  });
});
router.get('/:id/steps', function (req, res) {
  var id = req.params.id;
  Schemes.findSteps(id).then(function (steps) {
    if (steps.length) {
      // console.log(steps)
      res.json(steps);
    } else {
      res.status(404).json({
        message: 'Could not find steps for given scheme'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to get steps'
    });
  });
});
router.post('/', function (req, res) {
  var schemeData = req.body;
  Schemes.add(schemeData).then(function (scheme) {
    res.status(201).json(scheme);
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to create new scheme'
    });
  });
});
router.post('/:id/steps', function (req, res) {
  var stepData = req.body;
  var id = req.params.id;
  Schemes.findById(id).then(function (scheme) {
    if (scheme) {
      Schemes.addStep(stepData, id).then(function (step) {
        res.status(201).json(step);
      });
    } else {
      res.status(404).json({
        message: 'Could not find scheme with given id.'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to create new step'
    });
  });
});
router.put('/:id', function (req, res) {
  var id = req.params.id;
  var changes = req.body;
  Schemes.findById(id).then(function (scheme) {
    if (scheme) {
      Schemes.update(changes, id).then(function (updatedScheme) {
        res.json(updatedScheme);
      });
    } else {
      res.status(404).json({
        message: 'Could not find scheme with given id'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to update scheme'
    });
  });
});
router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  Schemes.remove(id).then(function (deleted) {
    if (deleted) {
      res.json({
        removed: deleted
      });
    } else {
      res.status(404).json({
        message: 'Could not find scheme with given id'
      });
    }
  })["catch"](function (err) {
    res.status(500).json({
      message: 'Failed to delete scheme'
    });
  });
});
module.exports = router;