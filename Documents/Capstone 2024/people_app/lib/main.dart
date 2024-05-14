import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'firebase_options.dart';
import 'package:postgres/postgres.dart';

Future<void> openConnection() async {
  final conn = await Connection.open(Endpoint(
    host: 'localhost',
    database: 'capstone',
    username: 'okad',
    password: 'okad',
  ));
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  await openConnection();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: "People Page",
      home: PeoplePage(),
    );
  }
}

class PeoplePage extends StatefulWidget {
  const PeoplePage({super.key});

  @override
  _PeoplePageState createState() => _PeoplePageState();
}

class _PeoplePageState extends State<PeoplePage> {
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _roleController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('People'),
      ),
      body: StreamBuilder(
        stream: FirebaseFirestore.instance.collection('people').snapshots(),
        builder: (BuildContext context, AsyncSnapshot<QuerySnapshot> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
          if (!snapshot.hasData || snapshot.data == null) {
            return const Center(
              child: Text('No data available'),
            );
          }
          List<DocumentSnapshot> documents = snapshot.data!.docs;
          return ListView.builder(
            itemCount: documents.length,
            itemBuilder: (BuildContext context, int index) {
              Map<String, dynamic> data =
                  snapshot.data!.docs[index].data()! as Map<String, dynamic>;
              String firstName = data['firstName'];
              String lastName = data['lastName'];
              String name = '$firstName $lastName';
              String role = data['role'];
              return ListTile(
                leading: CircleAvatar(
                  child: Text(firstName[0]),
                ),
                title: Text(name),
                subtitle: Text(role),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      icon: const Icon(Icons.edit),
                      onPressed: () {
                        showDialog(
                          context: context,
                          builder: (context) {
                            return AlertDialog(
                              title: const Text('Edit Person'),
                              content: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  TextField(
                                    controller: _firstNameController
                                      ..text = firstName,
                                    decoration: const InputDecoration(
                                        labelText: 'First Name'),
                                  ),
                                  TextField(
                                    controller: _lastNameController
                                      ..text = lastName,
                                    decoration: const InputDecoration(
                                        labelText: 'Last Name'),
                                  ),
                                  TextField(
                                    controller: _roleController..text = role,
                                    decoration: const InputDecoration(
                                        labelText: 'Role'),
                                  ),
                                ],
                              ),
                              actions: [
                                TextButton(
                                  onPressed: () {
                                    Navigator.pop(context);
                                  },
                                  child: const Text('Cancel'),
                                ),
                                TextButton(
                                  onPressed: () {
                                    String updatedFirstName =
                                        _firstNameController.text;
                                    String updatedLastName =
                                        _lastNameController.text;
                                    String updatedRole = _roleController.text;
                                    // Update Firestore document
                                    FirebaseFirestore.instance
                                        .collection('people')
                                        .doc(documents[index]
                                            .id) // Get the document ID
                                        .update({
                                      'firstName': updatedFirstName,
                                      'lastName': updatedLastName,
                                      'role': updatedRole,
                                    });
                                    // Close dialog
                                    Navigator.pop(context);
                                  },
                                  child: const Text('Save'),
                                )
                              ],
                            );
                          },
                        );
                      },
                    ),
                    IconButton(
                      icon: const Icon(Icons.delete),
                      onPressed: () {
                        showDialog(
                          context: context,
                          builder: (context) {
                            return AlertDialog(
                              title: const Text('Delete Person'),
                              content: const Text(
                                  'Are you sure you want to delete this person?'),
                              actions: [
                                TextButton(
                                  onPressed: () {
                                    Navigator.pop(context);
                                  },
                                  child: const Text('Cancel'),
                                ),
                                TextButton(
                                  onPressed: () {
                                    // Delete person logic here
                                    FirebaseFirestore.instance
                                        .collection('people')
                                        .doc(documents[index]
                                            .id) // Use document ID to delete specific document
                                        .delete();
                                    // Close dialog
                                    Navigator.pop(context);
                                  },
                                  child: const Text('Delete'),
                                )
                              ],
                            );
                          },
                        );
                      },
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: const Text('Add Person'),
                content: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextField(
                      controller: _firstNameController,
                      decoration:
                          const InputDecoration(labelText: 'First Name'),
                    ),
                    TextField(
                      controller: _lastNameController,
                      decoration: const InputDecoration(labelText: 'Last Name'),
                    ),
                    TextField(
                      controller: _roleController,
                      decoration: const InputDecoration(labelText: 'Role'),
                    ),
                  ],
                ),
                actions: [
                  TextButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    child: const Text('Cancel'),
                  ),
                  TextButton(
                    onPressed: () {
                      // Add person logic here
                      String newFirstName = _firstNameController.text;
                      String newLastName = _lastNameController.text;
                      String newRole = _roleController.text;
                      FirebaseFirestore.instance.collection('people').add({
                        'firstName': newFirstName,
                        'lastName': newLastName,
                        'role': newRole,
                      });
                      _firstNameController.clear();
                      _lastNameController.clear();
                      _roleController.clear();
                      // Close dialog
                      Navigator.pop(context);
                    },
                    child: const Text('Add'),
                  )
                ],
              );
            },
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
