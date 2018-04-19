newConstructor {
  _adapter:
   { identity: 'sails-disk',
     adapterApiVersion: 1,
     defaults: { schema: false, dir: '.tmp/localDiskDb' },
     datastores:
      { default:
         { config:
            { schema: false,
              dir: '.tmp/localDiskDb',
              adapter: 'sails-disk',
              identity: 'default' },
           dbs:
            { archive:
               Datastore {
                 inMemoryOnly: false,
                 autoload: false,
                 timestampData: false,
                 filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/archive.db',
                 compareStrings: undefined,
                 persistence:
                  Persistence {
                    db: [Circular],
                    inMemoryOnly: false,
                    filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/archive.db',
                    corruptAlertThreshold: 0.1,
                    afterSerialization: [Function],
                    beforeDeserialization: [Function] },
                 executor:
                  Executor {
                    buffer: [],
                    ready: true,
                    queue:
                     { tasks: [],
                       concurrency: 1,
                       saturated: null,
                       empty: null,
                       drain: null,
                       push: [Function: push],
                       unshift: [Function: unshift],
                       process: [Function: process],
                       length: [Function: length],
                       running: [Function: running] } },
                 indexes:
                  { _id:
                     Index {
                       fieldName: '_id',
                       unique: true,
                       sparse: false,
                       treeOptions:
                        { unique: true,
                          compareKeys: [Function: compareThings],
                          checkValueEquality: [Function: checkValueEquality] },
                       tree:
                        AVLTree {
                          tree:
                           _AVLTree {
                             left: null,
                             right: null,
                             parent: null,
                             data: [],
                             unique: true,
                             compareKeys: [Function: compareThings],
                             checkValueEquality: [Function: checkValueEquality] } } },
                    id:
                     Index {
                       fieldName: 'id',
                       unique: true,
                       sparse: false,
                       treeOptions:
                        { unique: true,
                          compareKeys: [Function: compareThings],
                          checkValueEquality: [Function: checkValueEquality] },
                       tree:
                        AVLTree {
                          tree:
                           _AVLTree {
                             left: null,
                             right: null,
                             parent: null,
                             data: [],
                             unique: true,
                             compareKeys: [Function: compareThings],
                             checkValueEquality: [Function: checkValueEquality] } } } },
                 ttlIndexes: {} },
              user:
               Datastore {
                 inMemoryOnly: false,
                 autoload: false,
                 timestampData: false,
                 filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/user.db',
                 compareStrings: undefined,
                 persistence:
                  Persistence {
                    db: [Circular],
                    inMemoryOnly: false,
                    filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/user.db',
                    corruptAlertThreshold: 0.1,
                    afterSerialization: [Function],
                    beforeDeserialization: [Function] },
                 executor:
                  Executor {
                    buffer: [],
                    ready: true,
                    queue:
                     { tasks: [],
                       concurrency: 1,
                       saturated: null,
                       empty: null,
                       drain: null,
                       push: [Function: push],
                       unshift: [Function: unshift],
                       process: [Function: process],
                       length: [Function: length],
                       running: [Function: running] } },
                 indexes:
                  { _id:
                     Index {
                       fieldName: '_id',
                       unique: true,
                       sparse: false,
                       treeOptions:
                        { unique: true,
                          compareKeys: [Function: compareThings],
                          checkValueEquality: [Function: checkValueEquality] },
                       tree:
                        AVLTree {
                          tree:
                           _AVLTree {
                             left: null,
                             right: null,
                             parent: null,
                             data:
                              [ { createdAt: 1523995104278,
                                  updatedAt: 1523995104278,
                                  id: 1,
                                  emailAddress: 'admin@example.com',
                                  password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                  fullName: 'Ryan Dahl',
                                  isSuperAdmin: true,
                                  passwordResetToken: '',
                                  passwordResetTokenExpiresAt: 0,
                                  stripeCustomerId: '',
                                  hasBillingCard: false,
                                  billingCardBrand: '',
                                  billingCardLast4: '',
                                  billingCardExpMonth: '',
                                  billingCardExpYear: '',
                                  emailProofToken: '',
                                  emailProofTokenExpiresAt: 0,
                                  emailStatus: 'confirmed',
                                  emailChangeCandidate: '',
                                  tosAcceptedByIp: '',
                                  lastSeenAt: 0,
                                  _id: 1 } ],
                             unique: true,
                             compareKeys: [Function: compareThings],
                             checkValueEquality: [Function: checkValueEquality],
                             key: 1,
                             height: 1 } } },
                    id:
                     Index {
                       fieldName: 'id',
                       unique: true,
                       sparse: false,
                       treeOptions:
                        { unique: true,
                          compareKeys: [Function: compareThings],
                          checkValueEquality: [Function: checkValueEquality] },
                       tree:
                        AVLTree {
                          tree:
                           _AVLTree {
                             left: null,
                             right: null,
                             parent: null,
                             data:
                              [ { createdAt: 1523995104278,
                                  updatedAt: 1523995104278,
                                  id: 1,
                                  emailAddress: 'admin@example.com',
                                  password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                  fullName: 'Ryan Dahl',
                                  isSuperAdmin: true,
                                  passwordResetToken: '',
                                  passwordResetTokenExpiresAt: 0,
                                  stripeCustomerId: '',
                                  hasBillingCard: false,
                                  billingCardBrand: '',
                                  billingCardLast4: '',
                                  billingCardExpMonth: '',
                                  billingCardExpYear: '',
                                  emailProofToken: '',
                                  emailProofTokenExpiresAt: 0,
                                  emailStatus: 'confirmed',
                                  emailChangeCandidate: '',
                                  tosAcceptedByIp: '',
                                  lastSeenAt: 0,
                                  _id: 1 } ],
                             unique: true,
                             compareKeys: [Function: compareThings],
                             checkValueEquality: [Function: checkValueEquality],
                             key: 1,
                             height: 1 } } },
                    emailAddress:
                     Index {
                       fieldName: 'emailAddress',
                       unique: true,
                       sparse: false,
                       treeOptions:
                        { unique: true,
                          compareKeys: [Function: compareThings],
                          checkValueEquality: [Function: checkValueEquality] },
                       tree:
                        AVLTree {
                          tree:
                           _AVLTree {
                             left: null,
                             right: null,
                             parent: null,
                             data:
                              [ { createdAt: 1523995104278,
                                  updatedAt: 1523995104278,
                                  id: 1,
                                  emailAddress: 'admin@example.com',
                                  password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                  fullName: 'Ryan Dahl',
                                  isSuperAdmin: true,
                                  passwordResetToken: '',
                                  passwordResetTokenExpiresAt: 0,
                                  stripeCustomerId: '',
                                  hasBillingCard: false,
                                  billingCardBrand: '',
                                  billingCardLast4: '',
                                  billingCardExpMonth: '',
                                  billingCardExpYear: '',
                                  emailProofToken: '',
                                  emailProofTokenExpiresAt: 0,
                                  emailStatus: 'confirmed',
                                  emailChangeCandidate: '',
                                  tosAcceptedByIp: '',
                                  lastSeenAt: 0,
                                  _id: 1 } ],
                             unique: true,
                             compareKeys: [Function: compareThings],
                             checkValueEquality: [Function: checkValueEquality],
                             key: 'admin@example.com',
                             height: 1 } } } },
                 ttlIndexes: {} },
              contact:
               Datastore {
                 inMemoryOnly: false,
                 autoload: false,
                 timestampData: false,
                 filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/contact.db',
                 compareStrings: undefined,
                 persistence:
                  Persistence {
                    db: [Circular],
                    inMemoryOnly: false,
                    filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/contact.db',
                    corruptAlertThreshold: 0.1,
                    afterSerialization: [Function],
                    beforeDeserialization: [Function] },
                 executor:
                  Executor {
                    buffer: [],
                    ready: true,
                    queue:
                     { tasks: [],
                       concurrency: 1,
                       saturated: null,
                       empty: null,
                       drain: null,
                       push: [Function: push],
                       unshift: [Function: unshift],
                       process: [Function: process],
                       length: [Function: length],
                       running: [Function: running] } },
                 indexes:
                  { _id:
                     Index {
                       fieldName: '_id',
                       unique: true,
                       sparse: false,
                       treeOptions:
                        { unique: true,
                          compareKeys: [Function: compareThings],
                          checkValueEquality: [Function: checkValueEquality] },
                       tree:
                        AVLTree {
                          tree:
                           _AVLTree {
                             left: null,
                             right:
                              _AVLTree {
                                left: null,
                                right: null,
                                parent: [Circular],
                                key: 2,
                                data:
                                 [ { createdAt: 1524081932712,
                                     updatedAt: 1524081932712,
                                     id: 2,
                                     fullName: 'Kendrick Lamar',
                                     address1: '',
                                     address2: '',
                                     city: '',
                                     state: '',
                                     zip: '',
                                     age: 0,
                                     _id: 2 } ],
                                unique: true,
                                compareKeys: [Function: compareThings],
                                checkValueEquality: [Function: checkValueEquality],
                                height: 1 },
                             parent: null,
                             data:
                              [ { createdAt: 1524081915304,
                                  updatedAt: 1524081915304,
                                  id: 1,
                                  fullName: 'David Jones',
                                  address1: '',
                                  address2: '',
                                  city: '',
                                  state: '',
                                  zip: '',
                                  age: 0,
                                  _id: 1 } ],
                             unique: true,
                             compareKeys: [Function: compareThings],
                             checkValueEquality: [Function: checkValueEquality],
                             key: 1,
                             height: 2 } } },
                    id:
                     Index {
                       fieldName: 'id',
                       unique: true,
                       sparse: false,
                       treeOptions:
                        { unique: true,
                          compareKeys: [Function: compareThings],
                          checkValueEquality: [Function: checkValueEquality] },
                       tree:
                        AVLTree {
                          tree:
                           _AVLTree {
                             left: null,
                             right:
                              _AVLTree {
                                left: null,
                                right: null,
                                parent: [Circular],
                                key: 2,
                                data:
                                 [ { createdAt: 1524081932712,
                                     updatedAt: 1524081932712,
                                     id: 2,
                                     fullName: 'Kendrick Lamar',
                                     address1: '',
                                     address2: '',
                                     city: '',
                                     state: '',
                                     zip: '',
                                     age: 0,
                                     _id: 2 } ],
                                unique: true,
                                compareKeys: [Function: compareThings],
                                checkValueEquality: [Function: checkValueEquality],
                                height: 1 },
                             parent: null,
                             data:
                              [ { createdAt: 1524081915304,
                                  updatedAt: 1524081915304,
                                  id: 1,
                                  fullName: 'David Jones',
                                  address1: '',
                                  address2: '',
                                  city: '',
                                  state: '',
                                  zip: '',
                                  age: 0,
                                  _id: 1 } ],
                             unique: true,
                             compareKeys: [Function: compareThings],
                             checkValueEquality: [Function: checkValueEquality],
                             key: 1,
                             height: 2 } } } },
                 ttlIndexes: {} } },
           sequences: { contact_id_seq: 2, user_id_seq: 1, archive_id_seq: 0 },
           primaryKeyCols: { contact: 'id', user: 'id', archive: 'id' },
           refCols: { contact: [], user: [], archive: [] } } },
     registerDatastore: [Function: registerDatastore],
     teardown: [Function: teardown],
     create: [Function: create],
     createEach: [Function: createEach],
     find: [Function: find],
     update: [Function: update],
     destroy: [Function: destroy],
     avg: [Function: avg],
     sum: [Function: sum],
     count: [Function: count],
     define: [Function: define],
     drop: [Function: drop],
     setSequence: [Function: setSequence] },
  _orm:
   { collections:
      { contact: [Circular],
        user:
         newConstructor {
           _adapter:
            { identity: 'sails-disk',
              adapterApiVersion: 1,
              defaults: { schema: false, dir: '.tmp/localDiskDb' },
              datastores:
               { default:
                  { config:
                     { schema: false,
                       dir: '.tmp/localDiskDb',
                       adapter: 'sails-disk',
                       identity: 'default' },
                    dbs:
                     { archive:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/archive.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/archive.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data: [],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality] } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data: [],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality] } } } },
                          ttlIndexes: {} },
                       user:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/user.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/user.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 1 } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 1 } } },
                             emailAddress:
                              Index {
                                fieldName: 'emailAddress',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 'admin@example.com',
                                      height: 1 } } } },
                          ttlIndexes: {} },
                       contact:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/contact.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/contact.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right:
                                       _AVLTree {
                                         left: null,
                                         right: null,
                                         parent: [Circular],
                                         key: 2,
                                         data:
                                          [ { createdAt: 1524081932712,
                                              updatedAt: 1524081932712,
                                              id: 2,
                                              fullName: 'Kendrick Lamar',
                                              address1: '',
                                              address2: '',
                                              city: '',
                                              state: '',
                                              zip: '',
                                              age: 0,
                                              _id: 2 } ],
                                         unique: true,
                                         compareKeys: [Function: compareThings],
                                         checkValueEquality: [Function: checkValueEquality],
                                         height: 1 },
                                      parent: null,
                                      data:
                                       [ { createdAt: 1524081915304,
                                           updatedAt: 1524081915304,
                                           id: 1,
                                           fullName: 'David Jones',
                                           address1: '',
                                           address2: '',
                                           city: '',
                                           state: '',
                                           zip: '',
                                           age: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 2 } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right:
                                       _AVLTree {
                                         left: null,
                                         right: null,
                                         parent: [Circular],
                                         key: 2,
                                         data:
                                          [ { createdAt: 1524081932712,
                                              updatedAt: 1524081932712,
                                              id: 2,
                                              fullName: 'Kendrick Lamar',
                                              address1: '',
                                              address2: '',
                                              city: '',
                                              state: '',
                                              zip: '',
                                              age: 0,
                                              _id: 2 } ],
                                         unique: true,
                                         compareKeys: [Function: compareThings],
                                         checkValueEquality: [Function: checkValueEquality],
                                         height: 1 },
                                      parent: null,
                                      data:
                                       [ { createdAt: 1524081915304,
                                           updatedAt: 1524081915304,
                                           id: 1,
                                           fullName: 'David Jones',
                                           address1: '',
                                           address2: '',
                                           city: '',
                                           state: '',
                                           zip: '',
                                           age: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 2 } } } },
                          ttlIndexes: {} } },
                    sequences: { contact_id_seq: 2, user_id_seq: 1, archive_id_seq: 0 },
                    primaryKeyCols: { contact: 'id', user: 'id', archive: 'id' },
                    refCols: { contact: [], user: [], archive: [] } } },
              registerDatastore: [Function: registerDatastore],
              teardown: [Function: teardown],
              create: [Function: create],
              createEach: [Function: createEach],
              find: [Function: find],
              update: [Function: update],
              destroy: [Function: destroy],
              avg: [Function: avg],
              sum: [Function: sum],
              count: [Function: count],
              define: [Function: define],
              drop: [Function: drop],
              setSequence: [Function: setSequence] },
           _orm: [Circular],
           waterline: [Circular],
           _callbacks: {},
           hasSchema: true,
           _transformer:
            { _transformations:
               { createdAt: 'createdAt',
                 updatedAt: 'updatedAt',
                 id: 'id',
                 emailAddress: 'emailAddress',
                 password: 'password',
                 fullName: 'fullName',
                 isSuperAdmin: 'isSuperAdmin',
                 passwordResetToken: 'passwordResetToken',
                 passwordResetTokenExpiresAt: 'passwordResetTokenExpiresAt',
                 stripeCustomerId: 'stripeCustomerId',
                 hasBillingCard: 'hasBillingCard',
                 billingCardBrand: 'billingCardBrand',
                 billingCardLast4: 'billingCardLast4',
                 billingCardExpMonth: 'billingCardExpMonth',
                 billingCardExpYear: 'billingCardExpYear',
                 emailProofToken: 'emailProofToken',
                 emailProofTokenExpiresAt: 'emailProofTokenExpiresAt',
                 emailStatus: 'emailStatus',
                 emailChangeCandidate: 'emailChangeCandidate',
                 tosAcceptedByIp: 'tosAcceptedByIp',
                 lastSeenAt: 'lastSeenAt' } },
           associations: [],
           publish: [Function: wrapper],
           subscribe: [Function: wrapper],
           unsubscribe: [Function: wrapper],
           getRoomName: [Function: getRoomName],
           _publishRPS: [Function: _publishRPS],
           _room: [Function: wrapper],
           _classRoom: [Function: _classRoom],
           _publishUpdate: [Function: wrapper],
           _publishDestroy: [Function: wrapper],
           _publishAdd: [Function: wrapper],
           _publishRemove: [Function: wrapper],
           _publishCreate: [Function: wrapper],
           _publishCreateSingle: [Function: _publishCreateSingle],
           _watch: [Function: wrapper],
           _introduce: [Function: wrapper],
           _retire: [Function: wrapper],
           autosubscribe: true },
        archive:
         newConstructor {
           _adapter:
            { identity: 'sails-disk',
              adapterApiVersion: 1,
              defaults: { schema: false, dir: '.tmp/localDiskDb' },
              datastores:
               { default:
                  { config:
                     { schema: false,
                       dir: '.tmp/localDiskDb',
                       adapter: 'sails-disk',
                       identity: 'default' },
                    dbs:
                     { archive:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/archive.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/archive.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data: [],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality] } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data: [],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality] } } } },
                          ttlIndexes: {} },
                       user:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/user.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/user.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 1 } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 1 } } },
                             emailAddress:
                              Index {
                                fieldName: 'emailAddress',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 'admin@example.com',
                                      height: 1 } } } },
                          ttlIndexes: {} },
                       contact:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/contact.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/contact.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right:
                                       _AVLTree {
                                         left: null,
                                         right: null,
                                         parent: [Circular],
                                         key: 2,
                                         data:
                                          [ { createdAt: 1524081932712,
                                              updatedAt: 1524081932712,
                                              id: 2,
                                              fullName: 'Kendrick Lamar',
                                              address1: '',
                                              address2: '',
                                              city: '',
                                              state: '',
                                              zip: '',
                                              age: 0,
                                              _id: 2 } ],
                                         unique: true,
                                         compareKeys: [Function: compareThings],
                                         checkValueEquality: [Function: checkValueEquality],
                                         height: 1 },
                                      parent: null,
                                      data:
                                       [ { createdAt: 1524081915304,
                                           updatedAt: 1524081915304,
                                           id: 1,
                                           fullName: 'David Jones',
                                           address1: '',
                                           address2: '',
                                           city: '',
                                           state: '',
                                           zip: '',
                                           age: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 2 } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right:
                                       _AVLTree {
                                         left: null,
                                         right: null,
                                         parent: [Circular],
                                         key: 2,
                                         data:
                                          [ { createdAt: 1524081932712,
                                              updatedAt: 1524081932712,
                                              id: 2,
                                              fullName: 'Kendrick Lamar',
                                              address1: '',
                                              address2: '',
                                              city: '',
                                              state: '',
                                              zip: '',
                                              age: 0,
                                              _id: 2 } ],
                                         unique: true,
                                         compareKeys: [Function: compareThings],
                                         checkValueEquality: [Function: checkValueEquality],
                                         height: 1 },
                                      parent: null,
                                      data:
                                       [ { createdAt: 1524081915304,
                                           updatedAt: 1524081915304,
                                           id: 1,
                                           fullName: 'David Jones',
                                           address1: '',
                                           address2: '',
                                           city: '',
                                           state: '',
                                           zip: '',
                                           age: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 2 } } } },
                          ttlIndexes: {} } },
                    sequences: { contact_id_seq: 2, user_id_seq: 1, archive_id_seq: 0 },
                    primaryKeyCols: { contact: 'id', user: 'id', archive: 'id' },
                    refCols: { contact: [], user: [], archive: [] } } },
              registerDatastore: [Function: registerDatastore],
              teardown: [Function: teardown],
              create: [Function: create],
              createEach: [Function: createEach],
              find: [Function: find],
              update: [Function: update],
              destroy: [Function: destroy],
              avg: [Function: avg],
              sum: [Function: sum],
              count: [Function: count],
              define: [Function: define],
              drop: [Function: drop],
              setSequence: [Function: setSequence] },
           _orm: [Circular],
           waterline: [Circular],
           _callbacks: {},
           hasSchema: true,
           _transformer:
            { _transformations:
               { id: 'id',
                 createdAt: 'createdAt',
                 fromModel: 'fromModel',
                 originalRecord: 'originalRecord',
                 originalRecordId: 'originalRecordId' } },
           associations: [],
           publish: [Function: wrapper],
           subscribe: [Function: wrapper],
           unsubscribe: [Function: wrapper],
           getRoomName: [Function: getRoomName],
           _publishRPS: [Function: _publishRPS],
           _room: [Function: wrapper],
           _classRoom: [Function: _classRoom],
           _publishUpdate: [Function: wrapper],
           _publishDestroy: [Function: wrapper],
           _publishAdd: [Function: wrapper],
           _publishRemove: [Function: wrapper],
           _publishCreate: [Function: wrapper],
           _publishCreateSingle: [Function: _publishCreateSingle],
           _watch: [Function: wrapper],
           _introduce: [Function: wrapper],
           _retire: [Function: wrapper],
           autosubscribe: true } },
     datastores: {} },
  waterline:
   { collections:
      { contact: [Circular],
        user:
         newConstructor {
           _adapter:
            { identity: 'sails-disk',
              adapterApiVersion: 1,
              defaults: { schema: false, dir: '.tmp/localDiskDb' },
              datastores:
               { default:
                  { config:
                     { schema: false,
                       dir: '.tmp/localDiskDb',
                       adapter: 'sails-disk',
                       identity: 'default' },
                    dbs:
                     { archive:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/archive.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/archive.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data: [],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality] } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data: [],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality] } } } },
                          ttlIndexes: {} },
                       user:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/user.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/user.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 1 } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 1 } } },
                             emailAddress:
                              Index {
                                fieldName: 'emailAddress',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 'admin@example.com',
                                      height: 1 } } } },
                          ttlIndexes: {} },
                       contact:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/contact.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/contact.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right:
                                       _AVLTree {
                                         left: null,
                                         right: null,
                                         parent: [Circular],
                                         key: 2,
                                         data:
                                          [ { createdAt: 1524081932712,
                                              updatedAt: 1524081932712,
                                              id: 2,
                                              fullName: 'Kendrick Lamar',
                                              address1: '',
                                              address2: '',
                                              city: '',
                                              state: '',
                                              zip: '',
                                              age: 0,
                                              _id: 2 } ],
                                         unique: true,
                                         compareKeys: [Function: compareThings],
                                         checkValueEquality: [Function: checkValueEquality],
                                         height: 1 },
                                      parent: null,
                                      data:
                                       [ { createdAt: 1524081915304,
                                           updatedAt: 1524081915304,
                                           id: 1,
                                           fullName: 'David Jones',
                                           address1: '',
                                           address2: '',
                                           city: '',
                                           state: '',
                                           zip: '',
                                           age: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 2 } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right:
                                       _AVLTree {
                                         left: null,
                                         right: null,
                                         parent: [Circular],
                                         key: 2,
                                         data:
                                          [ { createdAt: 1524081932712,
                                              updatedAt: 1524081932712,
                                              id: 2,
                                              fullName: 'Kendrick Lamar',
                                              address1: '',
                                              address2: '',
                                              city: '',
                                              state: '',
                                              zip: '',
                                              age: 0,
                                              _id: 2 } ],
                                         unique: true,
                                         compareKeys: [Function: compareThings],
                                         checkValueEquality: [Function: checkValueEquality],
                                         height: 1 },
                                      parent: null,
                                      data:
                                       [ { createdAt: 1524081915304,
                                           updatedAt: 1524081915304,
                                           id: 1,
                                           fullName: 'David Jones',
                                           address1: '',
                                           address2: '',
                                           city: '',
                                           state: '',
                                           zip: '',
                                           age: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 2 } } } },
                          ttlIndexes: {} } },
                    sequences: { contact_id_seq: 2, user_id_seq: 1, archive_id_seq: 0 },
                    primaryKeyCols: { contact: 'id', user: 'id', archive: 'id' },
                    refCols: { contact: [], user: [], archive: [] } } },
              registerDatastore: [Function: registerDatastore],
              teardown: [Function: teardown],
              create: [Function: create],
              createEach: [Function: createEach],
              find: [Function: find],
              update: [Function: update],
              destroy: [Function: destroy],
              avg: [Function: avg],
              sum: [Function: sum],
              count: [Function: count],
              define: [Function: define],
              drop: [Function: drop],
              setSequence: [Function: setSequence] },
           _orm: [Circular],
           waterline: [Circular],
           _callbacks: {},
           hasSchema: true,
           _transformer:
            { _transformations:
               { createdAt: 'createdAt',
                 updatedAt: 'updatedAt',
                 id: 'id',
                 emailAddress: 'emailAddress',
                 password: 'password',
                 fullName: 'fullName',
                 isSuperAdmin: 'isSuperAdmin',
                 passwordResetToken: 'passwordResetToken',
                 passwordResetTokenExpiresAt: 'passwordResetTokenExpiresAt',
                 stripeCustomerId: 'stripeCustomerId',
                 hasBillingCard: 'hasBillingCard',
                 billingCardBrand: 'billingCardBrand',
                 billingCardLast4: 'billingCardLast4',
                 billingCardExpMonth: 'billingCardExpMonth',
                 billingCardExpYear: 'billingCardExpYear',
                 emailProofToken: 'emailProofToken',
                 emailProofTokenExpiresAt: 'emailProofTokenExpiresAt',
                 emailStatus: 'emailStatus',
                 emailChangeCandidate: 'emailChangeCandidate',
                 tosAcceptedByIp: 'tosAcceptedByIp',
                 lastSeenAt: 'lastSeenAt' } },
           associations: [],
           publish: [Function: wrapper],
           subscribe: [Function: wrapper],
           unsubscribe: [Function: wrapper],
           getRoomName: [Function: getRoomName],
           _publishRPS: [Function: _publishRPS],
           _room: [Function: wrapper],
           _classRoom: [Function: _classRoom],
           _publishUpdate: [Function: wrapper],
           _publishDestroy: [Function: wrapper],
           _publishAdd: [Function: wrapper],
           _publishRemove: [Function: wrapper],
           _publishCreate: [Function: wrapper],
           _publishCreateSingle: [Function: _publishCreateSingle],
           _watch: [Function: wrapper],
           _introduce: [Function: wrapper],
           _retire: [Function: wrapper],
           autosubscribe: true },
        archive:
         newConstructor {
           _adapter:
            { identity: 'sails-disk',
              adapterApiVersion: 1,
              defaults: { schema: false, dir: '.tmp/localDiskDb' },
              datastores:
               { default:
                  { config:
                     { schema: false,
                       dir: '.tmp/localDiskDb',
                       adapter: 'sails-disk',
                       identity: 'default' },
                    dbs:
                     { archive:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/archive.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/archive.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data: [],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality] } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data: [],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality] } } } },
                          ttlIndexes: {} },
                       user:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/user.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/user.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 1 } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 1 } } },
                             emailAddress:
                              Index {
                                fieldName: 'emailAddress',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right: null,
                                      parent: null,
                                      data:
                                       [ { createdAt: 1523995104278,
                                           updatedAt: 1523995104278,
                                           id: 1,
                                           emailAddress: 'admin@example.com',
                                           password: '$2a$10$TubY6cEh3QHtIXNl/78EK.20DMJNqd8.hKqMjSodMsdgpjZOKB.UG',
                                           fullName: 'Ryan Dahl',
                                           isSuperAdmin: true,
                                           passwordResetToken: '',
                                           passwordResetTokenExpiresAt: 0,
                                           stripeCustomerId: '',
                                           hasBillingCard: false,
                                           billingCardBrand: '',
                                           billingCardLast4: '',
                                           billingCardExpMonth: '',
                                           billingCardExpYear: '',
                                           emailProofToken: '',
                                           emailProofTokenExpiresAt: 0,
                                           emailStatus: 'confirmed',
                                           emailChangeCandidate: '',
                                           tosAcceptedByIp: '',
                                           lastSeenAt: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 'admin@example.com',
                                      height: 1 } } } },
                          ttlIndexes: {} },
                       contact:
                        Datastore {
                          inMemoryOnly: false,
                          autoload: false,
                          timestampData: false,
                          filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/contact.db',
                          compareStrings: undefined,
                          persistence:
                           Persistence {
                             db: [Circular],
                             inMemoryOnly: false,
                             filename: '/Users/david/dev/mw/helm-build/.tmp/localDiskDb/contact.db',
                             corruptAlertThreshold: 0.1,
                             afterSerialization: [Function],
                             beforeDeserialization: [Function] },
                          executor:
                           Executor {
                             buffer: [],
                             ready: true,
                             queue:
                              { tasks: [],
                                concurrency: 1,
                                saturated: null,
                                empty: null,
                                drain: null,
                                push: [Function: push],
                                unshift: [Function: unshift],
                                process: [Function: process],
                                length: [Function: length],
                                running: [Function: running] } },
                          indexes:
                           { _id:
                              Index {
                                fieldName: '_id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right:
                                       _AVLTree {
                                         left: null,
                                         right: null,
                                         parent: [Circular],
                                         key: 2,
                                         data:
                                          [ { createdAt: 1524081932712,
                                              updatedAt: 1524081932712,
                                              id: 2,
                                              fullName: 'Kendrick Lamar',
                                              address1: '',
                                              address2: '',
                                              city: '',
                                              state: '',
                                              zip: '',
                                              age: 0,
                                              _id: 2 } ],
                                         unique: true,
                                         compareKeys: [Function: compareThings],
                                         checkValueEquality: [Function: checkValueEquality],
                                         height: 1 },
                                      parent: null,
                                      data:
                                       [ { createdAt: 1524081915304,
                                           updatedAt: 1524081915304,
                                           id: 1,
                                           fullName: 'David Jones',
                                           address1: '',
                                           address2: '',
                                           city: '',
                                           state: '',
                                           zip: '',
                                           age: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 2 } } },
                             id:
                              Index {
                                fieldName: 'id',
                                unique: true,
                                sparse: false,
                                treeOptions:
                                 { unique: true,
                                   compareKeys: [Function: compareThings],
                                   checkValueEquality: [Function: checkValueEquality] },
                                tree:
                                 AVLTree {
                                   tree:
                                    _AVLTree {
                                      left: null,
                                      right:
                                       _AVLTree {
                                         left: null,
                                         right: null,
                                         parent: [Circular],
                                         key: 2,
                                         data:
                                          [ { createdAt: 1524081932712,
                                              updatedAt: 1524081932712,
                                              id: 2,
                                              fullName: 'Kendrick Lamar',
                                              address1: '',
                                              address2: '',
                                              city: '',
                                              state: '',
                                              zip: '',
                                              age: 0,
                                              _id: 2 } ],
                                         unique: true,
                                         compareKeys: [Function: compareThings],
                                         checkValueEquality: [Function: checkValueEquality],
                                         height: 1 },
                                      parent: null,
                                      data:
                                       [ { createdAt: 1524081915304,
                                           updatedAt: 1524081915304,
                                           id: 1,
                                           fullName: 'David Jones',
                                           address1: '',
                                           address2: '',
                                           city: '',
                                           state: '',
                                           zip: '',
                                           age: 0,
                                           _id: 1 } ],
                                      unique: true,
                                      compareKeys: [Function: compareThings],
                                      checkValueEquality: [Function: checkValueEquality],
                                      key: 1,
                                      height: 2 } } } },
                          ttlIndexes: {} } },
                    sequences: { contact_id_seq: 2, user_id_seq: 1, archive_id_seq: 0 },
                    primaryKeyCols: { contact: 'id', user: 'id', archive: 'id' },
                    refCols: { contact: [], user: [], archive: [] } } },
              registerDatastore: [Function: registerDatastore],
              teardown: [Function: teardown],
              create: [Function: create],
              createEach: [Function: createEach],
              find: [Function: find],
              update: [Function: update],
              destroy: [Function: destroy],
              avg: [Function: avg],
              sum: [Function: sum],
              count: [Function: count],
              define: [Function: define],
              drop: [Function: drop],
              setSequence: [Function: setSequence] },
           _orm: [Circular],
           waterline: [Circular],
           _callbacks: {},
           hasSchema: true,
           _transformer:
            { _transformations:
               { id: 'id',
                 createdAt: 'createdAt',
                 fromModel: 'fromModel',
                 originalRecord: 'originalRecord',
                 originalRecordId: 'originalRecordId' } },
           associations: [],
           publish: [Function: wrapper],
           subscribe: [Function: wrapper],
           unsubscribe: [Function: wrapper],
           getRoomName: [Function: getRoomName],
           _publishRPS: [Function: _publishRPS],
           _room: [Function: wrapper],
           _classRoom: [Function: _classRoom],
           _publishUpdate: [Function: wrapper],
           _publishDestroy: [Function: wrapper],
           _publishAdd: [Function: wrapper],
           _publishRemove: [Function: wrapper],
           _publishCreate: [Function: wrapper],
           _publishCreateSingle: [Function: _publishCreateSingle],
           _watch: [Function: wrapper],
           _introduce: [Function: wrapper],
           _retire: [Function: wrapper],
           autosubscribe: true } },
     datastores: {} },
  _callbacks: {},
  hasSchema: true,
  _transformer:
   { _transformations:
      { createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        id: 'id',
        fullName: 'fullName',
        address1: 'address1',
        address2: 'address2',
        city: 'city',
        state: 'state',
        zip: 'zip',
        age: 'age' } },
  associations: [],
  publish: [Function: wrapper],
  subscribe: [Function: wrapper],
  unsubscribe: [Function: wrapper],
  getRoomName: [Function: getRoomName],
  _publishRPS: [Function: _publishRPS],
  _room: [Function: wrapper],
  _classRoom: [Function: _classRoom],
  _publishUpdate: [Function: wrapper],
  _publishDestroy: [Function: wrapper],
  _publishAdd: [Function: wrapper],
  _publishRemove: [Function: wrapper],
  _publishCreate: [Function: wrapper],
  _publishCreateSingle: [Function: _publishCreateSingle],
  _watch: [Function: wrapper],
  _introduce: [Function: wrapper],
  _retire: [Function: wrapper],
  autosubscribe: true,
  name: 'Contact' }
<- GET /contact/
