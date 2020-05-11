#!/bin/sh

node  scripts/generate-fake-data.js --min 20 examples/fixtures/ticket.js > examples/data/tickets.json
node  scripts/generate-fake-data.js --min 20 examples/fixtures/user.js > examples/data/users.json