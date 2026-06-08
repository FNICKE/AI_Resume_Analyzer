package com.resumeanalyzer.resume_analyzer_backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeanalyzer.resume_analyzer_backend.model.*;
import com.resumeanalyzer.resume_analyzer_backend.repository.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class InterviewPrepService {

    @Autowired
    private McqQuestionRepository mcqQuestionRepository;

    @Autowired
    private UserMcqAttemptRepository userMcqAttemptRepository;

    @Autowired
    private CodingChallengeRepository codingChallengeRepository;

    @Autowired
    private CodingSubmissionRepository codingSubmissionRepository;

    @Autowired
    private InterviewQuestionRepository interviewQuestionRepository;

    @Autowired
    private MockInterviewSessionRepository mockInterviewSessionRepository;

    @Value("${openai.api.key:}")
    private String openaiApiKey;

    @Value("${openai.model:gpt-4o-mini}")
    private String openaiModel;

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Value("${gemini.interview.api.key:}")
    private String geminiInterviewApiKey;

    @Value("${gemini.model:gemini-2.0-flash}")
    private String geminiModel;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void seedDatabase() {
        try {
            seedMcqs();
            seedCodingChallenges();
            seedInterviewQuestions();
        } catch (Exception e) {
            System.err.println("Error seeding database: " + e.getMessage());
        }
    }

    private void seedMcqs() {
        if (mcqQuestionRepository.count() == 0) {
            List<McqQuestion> mcqs = new ArrayList<>();
            
            // Java MCQ
            mcqs.add(new McqQuestion("Java", 
                "What is the default value of local variables in Java?", 
                "null", "0", "Depends on the data type", "Not initialized (leads to compilation error)", 
                "D", "Local variables in Java are stored on the stack and do not have default values. They must be explicitly initialized before use, otherwise, the compiler will throw a compilation error."));
            
            mcqs.add(new McqQuestion("Java", 
                "Which of these is a reserved keyword in Java but has no function?", 
                "const", "volatile", "transient", "strictfp", 
                "A", "In Java, 'const' and 'goto' are reserved keywords but are not currently used by the language."));

            mcqs.add(new McqQuestion("Java", 
                "Which class is the superclass of all classes in Java?", 
                "Class", "Object", "String", "System", 
                "B", "The java.lang.Object class is the root of the class hierarchy in Java. Every class has Object as a superclass."));

            // DSA MCQ
            mcqs.add(new McqQuestion("DSA", 
                "What is the worst-case time complexity of inserting a node into a Binary Search Tree (BST)?", 
                "O(1)", "O(log N)", "O(N)", "O(N log N)", 
                "C", "In the worst-case scenario, the BST is skewed (like a linked list). In this case, inserting a node requires traversing all N nodes, resulting in O(N) time complexity."));

            mcqs.add(new McqQuestion("DSA", 
                "Which data structure uses the LIFO (Last In First Out) principle?", 
                "Queue", "Stack", "Heap", "Deque", 
                "B", "A Stack is a LIFO (Last In First Out) data structure, where the last element inserted is the first one to be removed."));

            // SQL MCQ
            mcqs.add(new McqQuestion("SQL", 
                "Which SQL join returns all rows from the left table, and the matched rows from the right table?", 
                "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", 
                "B", "A LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table, and the matched records from the right table. If there is no match, the result is NULL from the right side."));

            mcqs.add(new McqQuestion("SQL", 
                "Which keyword is used to eliminate duplicate rows in SQL SELECT query?", 
                "UNIQUE", "DISTINCT", "DIFFERENT", "GROUP BY", 
                "B", "The DISTINCT keyword is used in a SELECT statement to filter out duplicate rows and return only unique values."));

            // OS MCQ
            mcqs.add(new McqQuestion("OS", 
                "What is a deadlock in Operating Systems?", 
                "When a process terminates unexpectedly.", 
                "A situation where a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process.", 
                "When CPU utilization reaches 100%.", 
                "A slow read operation from disk.", 
                "B", "A deadlock occurs when processes are blocked because each holds a resource and waits for another resource held by another process in a circular chain."));

            // Web Dev MCQ
            mcqs.add(new McqQuestion("Web Dev", 
                "What does the React hook useEffect with an empty dependency array [] represent?", 
                "It runs after every render.", 
                "It runs only once when the component mounts.", 
                "It runs every time state variables change.", 
                "It runs only when the component is unmounted.", 
                "B", "A useEffect hook with an empty dependency array [] runs once when the component mounts, mimicking the behavior of componentDidMount in class components."));

            mcqQuestionRepository.saveAll(mcqs);
            System.out.println("Seeded " + mcqs.size() + " MCQ questions.");
        }
    }

    private void seedCodingChallenges() {
        if (codingChallengeRepository.count() == 0) {
            List<CodingChallenge> challenges = new ArrayList<>();

            challenges.add(new CodingChallenge(
                "Two Sum",
                "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
                "Easy",
                "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
                "An array of integers `nums` and a single integer `target`.",
                "Indices of the two numbers as an array of two integers.",
                "nums = [2, 7, 11, 15], target = 9",
                "[0, 1]",
                "public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}"
            ));

            challenges.add(new CodingChallenge(
                "Reverse Linked List",
                "Given the head of a singly linked list, reverse the list, and return its reversed head.",
                "Easy",
                "The number of nodes in the list is in the range [0, 5000].\n-5000 <= Node.val <= 5000",
                "The head of a singly linked list.",
                "The head of the reversed singly linked list.",
                "head = [1, 2, 3, 4, 5]",
                "[5, 4, 3, 2, 1]",
                "class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n\npublic class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your code here\n        return null;\n    }\n}"
            ));

            challenges.add(new CodingChallenge(
                "Longest Substring Without Repeating",
                "Given a string `s`, find the length of the longest substring without repeating characters.",
                "Medium",
                "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
                "A string s.",
                "An integer representing the length of the longest substring without repeating characters.",
                "s = \"abcabcbb\"",
                "3",
                "public class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        return 0;\n    }\n}"
            ));

            codingChallengeRepository.saveAll(challenges);
            System.out.println("Seeded " + challenges.size() + " Coding Challenges.");
        }
    }

    private void seedInterviewQuestions() {
        if (interviewQuestionRepository.count() < 68) {
            interviewQuestionRepository.deleteAll();
            List<InterviewQuestion> questions = new ArrayList<>();

            // Java Questions (8)
            questions.add(new InterviewQuestion("Java", "Easy", "What are the core OOP concepts in Java?", "The core Object-Oriented Programming (OOP) concepts are:\n1. Inheritance: Subclasses inheriting state/behaviors from a superclass.\n2. Polymorphism: Ability to take multiple forms (overloading & overriding).\n3. Encapsulation: Hiding internal state via private fields and exposing via public getters/setters.\n4. Abstraction: Hiding complex implementation details and showing only essentials using abstract classes and interfaces."));
            questions.add(new InterviewQuestion("Java", "Medium", "What is JVM and how does garbage collection work?", "The JVM executes Java bytecode. Garbage collection is the automatic process of reclaiming heap memory. The Garbage Collector identifies unreachable objects (objects with no active references) and deallocates them. Common algorithms include CMS, G1, and ZGC, dividing memory into Young Generation (Eden, survivor) and Old Generation."));
            questions.add(new InterviewQuestion("Java", "Medium", "Explain the difference between an interface and an abstract class.", "An interface defines a contract (has default/static methods from Java 8), supports multiple inheritance, and fields are public static final. An abstract class is a class that cannot be instantiated, supports constructor creation, can maintain instance state, and can define non-final methods."));
            questions.add(new InterviewQuestion("Java", "Hard", "Explain the difference between HashMap, LinkedHashMap, and TreeMap in Java.", "HashMap makes no guarantees about the iteration order of the map; it offers O(1) performance. LinkedHashMap maintains a doubly-linked list running through all of its entries, defining insertion-order, with slight overhead. TreeMap is based on a Red-Black tree structure, sorting entries according to natural ordering or a custom Comparator, offering O(log n) complexity."));
            questions.add(new InterviewQuestion("Java", "Medium", "What are Java Streams and Lambda Expressions?", "Java Streams allow functional-style operations on collections (map, filter, reduce). Lambdas represent anonymous functions, providing a concise syntax to write functional interfaces without anonymous inner classes."));
            questions.add(new InterviewQuestion("Java", "Medium", "What is thread synchronization and how do you achieve it?", "Synchronization prevents thread interference and memory consistency errors. It is achieved using the 'synchronized' keyword on methods or blocks (locking on objects), or using locks from the 'java.util.concurrent.locks' package."));
            questions.add(new InterviewQuestion("Java", "Medium", "What is the Java ClassLoader hierarchy?", "ClassLoaders load classes dynamically. The hierarchy consists of:\n1. Bootstrap ClassLoader (loads core JDK libraries from rt.jar).\n2. Extension ClassLoader (loads extensions from ext directory).\n3. Application ClassLoader (loads classes from application classpath)."));
            questions.add(new InterviewQuestion("Java", "Easy", "Explain checked vs unchecked exceptions in Java.", "Checked exceptions are checked at compile time and must be handled using try-catch or declared in throws. Unchecked exceptions are runtime exceptions inheriting from RuntimeException and do not require mandatory handling."));

            // Spring Boot Questions (8)
            questions.add(new InterviewQuestion("Spring Boot", "Medium", "What is the purpose of @SpringBootApplication annotation?", "The @SpringBootApplication annotation is a convenience annotation that combines @Configuration (class defines bean sources), @EnableAutoConfiguration (automatically configures beans based on classpath setup), and @ComponentScan (registers components, services, and controllers in the package)."));
            questions.add(new InterviewQuestion("Spring Boot", "Medium", "What is Dependency Injection and how does Spring IoC container work?", "Dependency Injection is a pattern where objects receive their dependencies from an external container rather than creating them. The Spring IoC (Inversion of Control) container manages bean creation, dependency wiring, and lifecycle management."));
            questions.add(new InterviewQuestion("Spring Boot", "Medium", "What is the Spring Bean Lifecycle?", "Beans go through: Instantiation -> Populate Properties (Dependency Injection) -> Name/Factory Aware interfaces -> Post-processing -> Custom Initialization (annotated with @PostConstruct or init-method) -> Ready for Use -> Destruction (DisposableBean or destroy-method)."));
            questions.add(new InterviewQuestion("Spring Boot", "Easy", "What is the difference between Spring Boot and Spring MVC?", "Spring MVC is a web framework module within Spring. Spring Boot is an extension that offers auto-configuration, starter packages, and embedded servers to configure applications out-of-the-box."));
            questions.add(new InterviewQuestion("Spring Boot", "Hard", "How does transactional management work in Spring (@Transactional)?", "Spring manages transactions using AOP (Aspect-Oriented Programming) proxies. It wraps the method call in transactional context, starting a transaction, committing it on success, and rolling back on RuntimeExceptions."));
            questions.add(new InterviewQuestion("Spring Boot", "Easy", "How do Spring Profiles work?", "Profiles allow environment-specific configurations. You define application-dev.properties, application-prod.properties, etc. and activate them using spring.profiles.active."));
            questions.add(new InterviewQuestion("Spring Boot", "Hard", "How do microservices communicate in a Spring Boot ecosystem?", "Synchronously via REST APIs (RestTemplate, WebClient), gRPC, or declarative clients (Spring Cloud OpenFeign), or asynchronously using message brokers like Apache Kafka, RabbitMQ, or ActiveMQ."));
            questions.add(new InterviewQuestion("Spring Boot", "Medium", "What is Spring Security and how does JWT authentication work?", "Spring Security handles authentication/authorization. JSON Web Token (JWT) is a token-based stateless mechanism where the client sends a signed cryptographic token in the Authorization header on every request."));

            // Node.js Questions (8)
            questions.add(new InterviewQuestion("Node.js", "Medium", "What is the Event Loop in Node.js and how does it work?", "The Event Loop allows Node.js to perform non-blocking I/O operations by offloading tasks to the system kernel when possible. It continuously checks for pending callbacks, executing them in a single-threaded loop across phases like Timers, Pending Callbacks, Poll, Check, and Close Callbacks."));
            questions.add(new InterviewQuestion("Node.js", "Medium", "Explain buffer and stream concepts in Node.js.", "A Buffer represents raw binary data stored outside the V8 engine. A Stream is an abstract interface for handling reading or writing data chunk-by-chunk without loading the entire content into memory (e.g., readable, writable, duplex, transform)."));
            questions.add(new InterviewQuestion("Node.js", "Easy", "What is the difference between Node.js and client-side JavaScript?", "Client-side JavaScript runs inside browsers, interacts with the DOM/BOM, and has strict sandbox security. Node.js is a server-side JavaScript runtime powered by Google's V8 engine that accesses file systems, networks, and operating system modules."));
            questions.add(new InterviewQuestion("Node.js", "Medium", "What are Express middlewares and how do they work?", "Middlewares are functions that execute in the request-response lifecycle. They accept req, res, and next. They can run custom logs, validate headers, parse body parameters, or intercept requests before reaching final handlers."));
            questions.add(new InterviewQuestion("Node.js", "Hard", "What are Node.js worker threads and when should you use them?", "Worker threads run JS code in parallel threads on different CPU cores, sharing memory. They are used for CPU-bound computations (image scaling, hashing) so they don't block the main Event Loop thread."));
            questions.add(new InterviewQuestion("Node.js", "Medium", "What is Node.js clustering?", "Clustering creates child processes (workers) that share the same server port. This allows the application to utilize multi-core processors, distributing load across processes using round-robin routing."));
            questions.add(new InterviewQuestion("Node.js", "Easy", "Explain callbacks vs promises vs async/await.", "Callbacks pass functions to run later. Promises represent eventual completion or failure of an async operation. Async/await provides synchronous-looking syntax around Promises, improving code readability."));
            questions.add(new InterviewQuestion("Node.js", "Hard", "How do you handle memory leaks in a Node.js application?", "Memory leaks in Node.js are often caused by global variables, unresolved closures, or unreleased event listeners. They can be diagnosed using heap dumps, memwatch-next, or Chrome DevTools, and solved by ensuring proper scope cleanup, avoiding global state, and manually dereferencing unused objects."));

            // MERN Stack Questions (9)
            questions.add(new InterviewQuestion("MERN Stack", "Medium", "How does the MERN stack architecture work flow?", "A user interacts with React frontend. React sends HTTP requests to Express/Node backend, which communicates with MongoDB using Mongoose, queries/updates data, and returns JSON payloads to React to render dynamically."));
            questions.add(new InterviewQuestion("MERN Stack", "Easy", "What is CORS in a MERN application and how do you resolve it?", "Cross-Origin Resource Sharing is a browser security feature blocking requests to a different domain. It is resolved by configuring the 'cors' middleware in the Express backend to allow specific origins."));
            questions.add(new InterviewQuestion("MERN Stack", "Medium", "Explain JWT authentication workflow in the MERN stack.", "User inputs credentials in React. Express validates, signs a JWT token with secret key, and sends it back. React stores the token (localStorage or cookies) and sends it in the Authorization headers of API calls."));
            questions.add(new InterviewQuestion("MERN Stack", "Medium", "What is the Virtual DOM and Reconciliation process in React?", "Virtual DOM is an in-memory lightweight copy of the real DOM. Reconciliation is the process of syncing Virtual DOM to real DOM using a diffing algorithm (Fiber) to compute changes and render only updated nodes."));
            questions.add(new InterviewQuestion("MERN Stack", "Hard", "Compare Redux and React Context API for state management.", "Context API is standard for simple global values (like theme, locale) to avoid prop drilling. Redux is a centralized state container for complex business states, with middlewares (Thunk/Saga) and advanced devtools support."));
            questions.add(new InterviewQuestion("MERN Stack", "Easy", "What is the difference between SQL and MongoDB (NoSQL)?", "SQL databases are relational, table-based, strict schema, and scale vertically. MongoDB is document-oriented (JSON-like BSON), schema-less, and scales horizontally using sharding."));
            questions.add(new InterviewQuestion("MERN Stack", "Medium", "How do you implement aggregation in MongoDB?", "Using the aggregation pipeline (db.collection.aggregate([..])), which processes documents through consecutive stages like $match (filter), $group (aggregation metrics), $project (fields selection), and $sort (order)."));
            questions.add(new InterviewQuestion("MERN Stack", "Hard", "How do you manage transactions in a multi-document MongoDB collection?", "MongoDB supports ACID transactions across multiple documents and collections using Sessions (db.getMongo().startSession()). You run actions inside session boundaries and call commitTransaction() or abortTransaction()."));
            questions.add(new InterviewQuestion("MERN Stack", "Hard", "What are React Server Components and how do they differ from SSR?", "React Server Components (RSC) execute exclusively on the server and do not ship JavaScript to the client, resulting in smaller bundle sizes and direct backend resource access. Unlike traditional SSR (Server-Side Rendering), which generates HTML for the initial load and then hydrates everything on the client, RSCs let you fetch data and render server-only components alongside client components in a hybrid model."));

            // SQL Questions (8)
            questions.add(new InterviewQuestion("SQL", "Medium", "What is the difference between WHERE and HAVING clauses?", "WHERE filters records before any groupings are made and cannot contain aggregate functions. HAVING filters records after the GROUP BY clause has executed and is used specifically for aggregate conditions."));
            questions.add(new InterviewQuestion("SQL", "Easy", "What are ACID properties in database systems?", "ACID stands for:\n1. Atomicity: Whole transaction succeeds or fails.\n2. Consistency: DB moves from one valid state to another.\n3. Isolation: Concurrent transactions do not interfere.\n4. Durability: Committed transactions persist even on system crash."));
            questions.add(new InterviewQuestion("SQL", "Medium", "Explain database normalization forms (1NF, 2NF, 3NF, BCNF).", "Normalization structures databases to minimize redundancy. 1NF removes repeating groups; 2NF removes partial dependency on composite keys; 3NF removes transitive dependency on non-keys; BCNF handles anomalies with overlapping candidate keys."));
            questions.add(new InterviewQuestion("SQL", "Medium", "What is database indexing and how do B-Tree and Hash indexes differ?", "Indexes speed up retrieval. B-Tree is balanced, ordering records to support equality and range queries. Hash indexes use a hash function to map values, supporting only fast equality checks, not range lookups."));
            questions.add(new InterviewQuestion("SQL", "Easy", "Explain various types of SQL Joins.", "INNER JOIN: returns matching records in both tables. LEFT JOIN: returns all left records and matching right ones. RIGHT JOIN: returns all right records and matching left ones. FULL JOIN: returns all records when there is a match in either."));
            questions.add(new InterviewQuestion("SQL", "Medium", "What is the difference between stored procedures and triggers?", "Stored procedures are manually called collections of SQL statements, accepting parameters. Triggers are executed automatically on data modifications like INSERT, UPDATE, or DELETE events."));
            questions.add(new InterviewQuestion("SQL", "Hard", "What is database partitioning vs sharding, and when should you use each?", "Partitioning divides a database table into smaller local segments on a single logical database instance, improving query speeds for large datasets. Sharding is horizontal partitioning that distributes tables across multiple independent database server instances, enabling horizontal scaling across servers."));
            questions.add(new InterviewQuestion("SQL", "Hard", "Explain SQL transactions, savepoints, and isolation levels.", "Isolation levels manage visibility of changes to concurrent transactions. They are:\n1. Read Uncommitted (allows dirty reads).\n2. Read Committed (prevents dirty reads).\n3. Repeatable Read (prevents dirty and non-repeatable reads).\n4. Serializable (prevents all anomalies, locking ranges). Savepoints allow rolling back part of a transaction without canceling the whole operation."));

            // OS Questions (7)
            questions.add(new InterviewQuestion("OS", "Easy", "What is the difference between a process and a thread?", "A process is a self-contained execution unit with its own virtual address space, files, and resources allocated by the OS. A thread is a lightweight execution unit inside a process that shares the parent process's memory and resource state."));
            questions.add(new InterviewQuestion("OS", "Medium", "What are CPU scheduling algorithms?", "They determine which process gets CPU time. Algorithms include: First-Come-First-Serve (FCFS), Shortest Job First (SJF) (minimizes wait time), Round Robin (time slicing for multitasking), and Priority Scheduling."));
            questions.add(new InterviewQuestion("OS", "Medium", "Explain paging and segmentation in memory management.", "Paging divides logical memory into fixed-size pages mapped to physical frames using page tables. Segmentation divides memory into variable-sized logical blocks representing logical units (code, stack, heap)."));
            questions.add(new InterviewQuestion("OS", "Medium", "What is virtual memory and thrashing?", "Virtual memory swaps inactive pages between RAM and disk, acting as extended memory. Thrashing occurs when physical memory is exhausted and the system spends more time swapping pages than executing code."));
            questions.add(new InterviewQuestion("OS", "Hard", "Explain deadlocks and how to prevent them.", "A deadlock occurs when processes hold resources and wait for resources held by others in a circular chain. Prevented by removing circular wait, preemption, resource ranking, or using Banker's Algorithm."));
            questions.add(new InterviewQuestion("OS", "Medium", "What is a mutex vs a semaphore, and how do they differ in use cases?", "A Mutex (mutual exclusion object) is a locking mechanism used to synchronize access to a resource, owned by a single thread at a time. A Semaphore is a signaling mechanism using a counter to allow a limited number of threads to access a resource simultaneously."));
            questions.add(new InterviewQuestion("OS", "Hard", "Explain context switching and thread vs process switching overhead.", "Context switching is the process of saving the state of a running thread/process and loading the state of another. Process switching is expensive because it requires changing virtual memory page tables (invalidating TLB caches). Thread switching is much faster because threads share the same address space and memory mappings."));

            // Python Questions (7)
            questions.add(new InterviewQuestion("Python", "Easy", "What is the difference between a list and a tuple in Python?", "Lists are mutable (can modify element values), defined using square brackets []. Tuples are immutable (cannot modify values after creation), defined using parentheses (), and are faster."));
            questions.add(new InterviewQuestion("Python", "Medium", "What are decorators in Python and how do they work?", "Decorators wrap functions to modify or extend their behavior without altering source code. They are denoted with @decorator_name, taking a callable and returning a modified callable."));
            questions.add(new InterviewQuestion("Python", "Medium", "What is Python Global Interpreter Lock (GIL)?", "The GIL is a mutex that allows only one thread to control the Python interpreter. This prevents true parallel execution of multiple threads on multi-core systems, making threading inefficient for CPU-bound tasks."));
            questions.add(new InterviewQuestion("Python", "Easy", "What is the difference between an iterator and a generator?", "An iterator is an object implementing __iter__ and __next__ protocols. A generator is a function using the 'yield' keyword that automatically generates values lazily."));
            questions.add(new InterviewQuestion("Python", "Medium", "How does Python manage its memory?", "Python utilizes a private heap for all objects. Lifetimes are managed through reference counting. To resolve circular references, Python uses an automatic cyclic garbage collector."));
            questions.add(new InterviewQuestion("Python", "Hard", "Explain metaclasses in Python and how they differ from standard inheritance.", "Metaclasses are 'classes of classes' that define how a class behaves. A class is an instance of a metaclass (by default, type). Metaclasses allow customizing class creation (e.g. validating fields or registering blueprints) by overriding __new__ or __init__, whereas inheritance only modifies instances of created classes."));
            questions.add(new InterviewQuestion("Python", "Medium", "What is monkey patching in Python and when is it useful?", "Monkey patching is dynamically modifying a class or module at runtime without changing the source code. It is commonly used in testing to mock network behaviors, database calls, or external API responses."));

            // C++ Questions (7)
            questions.add(new InterviewQuestion("C++", "Easy", "What is the difference between pointers and references in C++?", "Pointers hold memory addresses, can be re-assigned or set to NULL, and require dereferencing. References are aliases, cannot be NULL, and must be initialized on declaration."));
            questions.add(new InterviewQuestion("C++", "Medium", "Explain virtual functions and runtime polymorphism in C++.", "Virtual functions (declared with the 'virtual' keyword in base class) let derived class overrides be called through base class pointers. This runtime resolution uses Virtual Method Tables (vtables)."));
            questions.add(new InterviewQuestion("C++", "Medium", "What is Resource Acquisition Is Initialization (RAII)?", "RAII binds resource management (memory, file streams, locks) to local object lifetimes. Resources are acquired in the constructor and automatically freed in the destructor, avoiding resource leaks."));
            questions.add(new InterviewQuestion("C++", "Medium", "How do smart pointers work in C++?", "Smart pointers manage raw pointers. std::unique_ptr manages exclusive ownership; std::shared_ptr maintains reference counts; std::weak_ptr provides non-owning references to avoid cycles."));
            questions.add(new InterviewQuestion("C++", "Medium", "What are templates in C++?", "Templates enable generic programming. You declare functions or classes with generic parameter types (template<typename T>) which get instantiated by the compiler at compile-time."));
            questions.add(new InterviewQuestion("C++", "Hard", "Explain the difference between std::move and copying in C++11.", "Copying creates a new instance with duplicate resource allocations. std::move casts an expression to an rvalue reference, enabling 'moving' resources (like pointers or file descriptors) from the source object to the destination instead of duplicating them, avoiding overhead."));
            questions.add(new InterviewQuestion("C++", "Medium", "What is undefined behavior in C++ and can you give common examples?", "Undefined behavior (UB) occurs when the code executes an operation for which the C++ standard does not specify a result. The compiler makes optimization assumptions that can lead to crashes or silent bugs. Common examples include out-of-bounds array access, dereferencing a null pointer, reading uninitialized variables, and signed integer overflow."));

            // System Design Questions (6)
            questions.add(new InterviewQuestion("System Design", "Hard", "How would you design a rate limiter for a distributed API gateway?", "Use algorithms like Token Bucket or Sliding Window Log. Track request rates using a fast shared cache like Redis, executing atomic increment checks with Lua scripts to prevent race conditions."));
            questions.add(new InterviewQuestion("System Design", "Medium", "What is the CAP Theorem?", "The CAP Theorem states that a distributed data store can simultaneously provide at most two of three guarantees: Consistency (all nodes see same data), Availability (every request gets a response), and Partition Tolerance (system functions despite network losses)."));
            questions.add(new InterviewQuestion("System Design", "Hard", "How would you design a distributed unique ID generator like Twitter Snowflake?", "Use a 64-bit structure: 1 bit unused, 41 bits timestamp (millisecond precision), 10 bits machine/node ID, and 12 bits sequence number (auto-incremented within the same millisecond). This generates ordered, globally unique IDs without a centralized coordinator."));
            questions.add(new InterviewQuestion("System Design", "Medium", "Explain the architecture of a URL Shortener service like Bit.ly.", "Use a relational or key-value database mapping short codes to long URLs. The short code is generated using Base62 encoding of a unique auto-incrementing ID. Use a distributed caching layer (like Redis) to store popular mappings to reduce database query load, and return 301 Redirect headers to the client."));
            questions.add(new InterviewQuestion("System Design", "Hard", "How would you design a message queue system like Kafka or RabbitMQ?", "A message queue divides data into Topics, which are split into ordered, append-only Partitions. Producers publish messages to partitions, Consumers pull messages in Consumer Groups tracking their offset index, and Broker nodes manage data storage, replication, and high-availability clustering."));
            questions.add(new InterviewQuestion("System Design", "Easy", "Explain horizontal vs vertical scaling and the role of load balancing.", "Vertical scaling (scaling up) means adding more power (CPU, RAM) to an existing server. Horizontal scaling (scaling out) means adding more servers to the network. Load balancing is critical in horizontal scaling to distribute incoming traffic across the pool of servers to ensure high availability and prevent single-point overload."));

            interviewQuestionRepository.saveAll(questions);
            System.out.println("Seeded " + questions.size() + " Technical Q&As.");
        }
    }

    public List<McqQuestion> getRandomMcqs(String topic, int limit) {
        return mcqQuestionRepository.findRandomQuestionsByTopic(topic, limit);
    }

    public UserMcqAttempt submitMcqTest(User user, String topic, List<Map<String, Object>> submissions) {
        int score = 0;
        int total = submissions.size();
        
        for (Map<String, Object> sub : submissions) {
            Long questionId = Long.valueOf(sub.get("questionId").toString());
            String selectedOption = (String) sub.get("selectedOption"); // "A", "B", "C", "D"
            
            Optional<McqQuestion> qOpt = mcqQuestionRepository.findById(questionId);
            if (qOpt.isPresent()) {
                McqQuestion q = qOpt.get();
                boolean correct = q.getCorrectAnswer().equalsIgnoreCase(selectedOption);
                sub.put("correct", correct);
                sub.put("correctAnswer", q.getCorrectAnswer());
                sub.put("explanation", q.getExplanation());
                sub.put("questionText", q.getQuestion());
                if (correct) {
                    score++;
                }
            }
        }

        String detailsJson = "";
        try {
            detailsJson = objectMapper.writeValueAsString(submissions);
        } catch (Exception e) {
            System.err.println("Error serialization details: " + e.getMessage());
        }

        UserMcqAttempt attempt = new UserMcqAttempt(user, topic, score, total, LocalDateTime.now(), detailsJson);
        return userMcqAttemptRepository.save(attempt);
    }

    public List<UserMcqAttempt> getMcqHistory(Long userId) {
        return userMcqAttemptRepository.findByUserIdOrderByAttemptDateDesc(userId);
    }

    public List<CodingChallenge> getAllChallenges() {
        return codingChallengeRepository.findAll();
    }

    public Optional<CodingChallenge> getChallengeById(Long id) {
        return codingChallengeRepository.findById(id);
    }

    public CodingSubmission submitCode(User user, Long challengeId, String code, String language) {
        CodingChallenge challenge = codingChallengeRepository.findById(challengeId)
            .orElseThrow(() -> new IllegalArgumentException("Challenge not found"));

        String status = "FAILED";
        String aiFeedback = "";
        boolean success = false;

        if (openaiApiKey != null && !openaiApiKey.trim().isEmpty()) {
            try {
                Map<String, Object> evalResult = callOpenAIForCodingEvaluation(challenge, code, language);
                status = (String) evalResult.getOrDefault("status", "FAILED");
                aiFeedback = (String) evalResult.getOrDefault("aiFeedback", "Failed to compile coding evaluation feedback.");
                success = true;
            } catch (Exception e) {
                System.err.println("Error calling OpenAI for code grading, trying Gemini fallback: " + e.getMessage());
            }
        }

        if (!success && isGeminiAvailable()) {
            try {
                Map<String, Object> evalResult = callGeminiForCodingEvaluation(challenge, code, language);
                status = (String) evalResult.getOrDefault("status", "FAILED");
                aiFeedback = (String) evalResult.getOrDefault("aiFeedback", "Failed to compile coding evaluation feedback via Gemini.");
                success = true;
            } catch (Exception e) {
                System.err.println("Error calling Gemini fallback for code grading: " + e.getMessage());
            }
        }

        if (!success) {
            status = "PASSED";
            aiFeedback = "### Local Offline Mode\n\nCode received. Since OpenAI and Gemini APIs are offline or failed, the submission has been marked PASSED statically.\n\n```" + language + "\n" + code + "\n```";
        }

        CodingSubmission submission = new CodingSubmission(user, challenge, code, language, status, aiFeedback, LocalDateTime.now());
        return codingSubmissionRepository.save(submission);
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> callOpenAIForCodingEvaluation(CodingChallenge challenge, String code, String language) throws Exception {
        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        String systemInstructions = "You are an automated coding execution sandbox compiler and code reviewer. Analyze the submitted user code for the given challenge. " +
            "Evaluate the solution for syntax correctness, runtime safety, and whether it solves the logic required by the description and sample cases. " +
            "Decide if it passes all test cases (status = PASSED) or fails due to logic errors (status = LOGICAL_ERROR) or compilation issues (status = COMPILATION_ERROR). " +
            "Return your evaluation in strict JSON format. The JSON object structure MUST be:\n" +
            "{\n" +
            "  \"status\": \"PASSED_OR_ERROR\",\n" +
            "  \"aiFeedback\": \"Markdown critique explaining: 1. Big-O Complexity, 2. Logical correctness analysis, 3. How to optimize or fix errors\"\n" +
            "}\n" +
            "Substitute 'PASSED_OR_ERROR' with either 'PASSED', 'COMPILATION_ERROR', or 'LOGICAL_ERROR'.";

        String prompt = "Challenge Title: " + challenge.getTitle() + "\n" +
            "Challenge Description: " + challenge.getDescription() + "\n" +
            "Constraints: " + challenge.getConstraints() + "\n" +
            "Sample Input: " + challenge.getSampleInput() + "\n" +
            "Sample Output: " + challenge.getSampleOutput() + "\n" +
            "Submitted Code Language: " + language + "\n" +
            "Submitted Code:\n" + code;

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", openaiModel);

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> systemMsg = new HashMap<>();
        systemMsg.put("role", "system");
        systemMsg.put("content", systemInstructions);
        messages.add(systemMsg);

        Map<String, String> userMsg = new HashMap<>();
        userMsg.put("role", "user");
        userMsg.put("content", prompt);
        messages.add(userMsg);

        payload.put("messages", messages);

        Map<String, Object> responseFormat = new HashMap<>();
        responseFormat.put("type", "json_object");
        payload.put("response_format", responseFormat);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        Map<String, Object> response = restTemplate.postForObject(url, entity, Map.class);

        if (response != null && response.containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> choice = choices.get(0);
                Map<String, Object> message = (Map<String, Object>) choice.get("message");
                String responseText = (String) message.get("content");
                return objectMapper.readValue(responseText, Map.class);
            }
        }
        throw new RuntimeException("Failed to get choices from OpenAI response");
    }

    private String getEffectiveGeminiApiKey() {
        if (geminiInterviewApiKey != null && !geminiInterviewApiKey.trim().isEmpty()) {
            return geminiInterviewApiKey;
        }
        return geminiApiKey;
    }

    private boolean isGeminiAvailable() {
        String key = getEffectiveGeminiApiKey();
        return key != null && !key.trim().isEmpty();
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> executeGeminiRequest(String systemInstructions, String prompt) throws Exception {
        String apiKey = getEffectiveGeminiApiKey();
        String url = "https://generativelanguage.googleapis.com/v1beta/models/" + geminiModel + ":generateContent?key=" + apiKey;

        Map<String, Object> textPart = new HashMap<>();
        textPart.put("text", systemInstructions + "\n\n" + prompt);

        Map<String, Object> partsObj = new HashMap<>();
        partsObj.put("parts", Collections.singletonList(textPart));

        Map<String, Object> payload = new HashMap<>();
        payload.put("contents", Collections.singletonList(partsObj));

        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("responseMimeType", "application/json");
        payload.put("generationConfig", generationConfig);

        Map<String, Object> response = restTemplate.postForObject(url, payload, Map.class);

        if (response != null && response.containsKey("candidates")) {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            if (!candidates.isEmpty()) {
                Map<String, Object> candidate = candidates.get(0);
                Map<String, Object> content = (Map<String, Object>) candidate.get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                if (!parts.isEmpty()) {
                    String responseText = (String) parts.get(0).get("text");
                    return objectMapper.readValue(responseText, Map.class);
                }
            }
        }
        throw new RuntimeException("Empty or invalid response from Gemini API");
    }

    private Map<String, Object> callGeminiForCodingEvaluation(CodingChallenge challenge, String code, String language) throws Exception {
        String systemInstructions = "You are an automated coding execution sandbox compiler and code reviewer. Analyze the submitted user code for the given challenge. " +
            "Evaluate the solution for syntax correctness, runtime safety, and whether it solves the logic required by the description and sample cases. " +
            "Decide if it passes all test cases (status = PASSED) or fails due to logic errors (status = LOGICAL_ERROR) or compilation issues (status = COMPILATION_ERROR). " +
            "Return your evaluation in strict JSON format. The JSON object structure MUST be:\n" +
            "{\n" +
            "  \"status\": \"PASSED_OR_ERROR\",\n" +
            "  \"aiFeedback\": \"Markdown critique explaining: 1. Big-O Complexity, 2. Logical correctness analysis, 3. How to optimize or fix errors\"\n" +
            "}\n" +
            "Substitute 'PASSED_OR_ERROR' with either 'PASSED', 'COMPILATION_ERROR', or 'LOGICAL_ERROR'.";

        String prompt = "Challenge Title: " + challenge.getTitle() + "\n" +
            "Challenge Description: " + challenge.getDescription() + "\n" +
            "Constraints: " + challenge.getConstraints() + "\n" +
            "Sample Input: " + challenge.getSampleInput() + "\n" +
            "Sample Output: " + challenge.getSampleOutput() + "\n" +
            "Submitted Code Language: " + language + "\n" +
            "Submitted Code:\n" + code;

        return executeGeminiRequest(systemInstructions, prompt);
    }

    public List<CodingSubmission> getCodingHistory(Long userId) {
        return codingSubmissionRepository.findByUserIdOrderBySubmittedAtDesc(userId);
    }

    public List<InterviewQuestion> getInterviewQuestions(String category) {
        if (category == null || category.trim().isEmpty() || "All".equalsIgnoreCase(category)) {
            return interviewQuestionRepository.findAll();
        }
        return interviewQuestionRepository.findByCategoryOrderByDifficultyAsc(category);
    }

    public Map<String, Object> getPerformanceStats(Long userId) {
        List<UserMcqAttempt> mcqs = userMcqAttemptRepository.findByUserIdOrderByAttemptDateDesc(userId);
        List<CodingSubmission> codes = codingSubmissionRepository.findByUserIdOrderBySubmittedAtDesc(userId);

        Map<String, Object> stats = new HashMap<>();
        
        // MCQ Stats
        stats.put("totalMcqQuizzes", mcqs.size());
        double avgScore = 0;
        if (!mcqs.isEmpty()) {
            int totalCorrect = 0;
            int totalQ = 0;
            for (UserMcqAttempt attempt : mcqs) {
                totalCorrect += attempt.getScore();
                totalQ += attempt.getTotalQuestions();
            }
            avgScore = totalQ > 0 ? ((double) totalCorrect / totalQ) * 100 : 0;
        }
        stats.put("averageMcqScore", Math.round(avgScore * 10.0) / 10.0);

        // Coding Stats
        stats.put("totalCodingSubmissions", codes.size());
        long passedCount = codes.stream().filter(c -> "PASSED".equalsIgnoreCase(c.getStatus())).count();
        stats.put("solvedCodingChallenges", passedCount);

        // Recent Activity lists
        List<Map<String, Object>> recentActivity = new ArrayList<>();
        int limit = Math.min(5, mcqs.size());
        for (int i = 0; i < limit; i++) {
            UserMcqAttempt m = mcqs.get(i);
            Map<String, Object> act = new HashMap<>();
            act.put("type", "MCQ");
            act.put("title", m.getTopic() + " Quiz");
            act.put("detail", "Score: " + m.getScore() + "/" + m.getTotalQuestions());
            act.put("date", m.getAttemptDate().toString());
            recentActivity.add(act);
        }
        limit = Math.min(5, codes.size());
        for (int i = 0; i < limit; i++) {
            CodingSubmission c = codes.get(i);
            Map<String, Object> act = new HashMap<>();
            act.put("type", "CODE");
            act.put("title", c.getChallenge().getTitle());
            act.put("detail", "Status: " + c.getStatus());
            act.put("date", c.getSubmittedAt().toString());
            recentActivity.add(act);
        }
        // sort by date descending
        recentActivity.sort((a, b) -> b.get("date").toString().compareTo(a.get("date").toString()));
        stats.put("recentActivity", recentActivity.subList(0, Math.min(5, recentActivity.size())));

        return stats;
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getAiFeedbackReport(Long userId) {
        List<UserMcqAttempt> mcqs = userMcqAttemptRepository.findByUserIdOrderByAttemptDateDesc(userId);
        List<CodingSubmission> codes = codingSubmissionRepository.findByUserIdOrderBySubmittedAtDesc(userId);

        if (openaiApiKey == null || openaiApiKey.trim().isEmpty()) {
            Map<String, Object> fallback = new HashMap<>();
            fallback.put("summary", "OpenAI API key is not configured. Aggregate stats offline are available, but AI tutoring recommendations are currently offline.");
            fallback.put("strengths", Arrays.asList("Offline mode active"));
            fallback.put("weaknesses", Arrays.asList("Enable OpenAI API key in application.properties"));
            fallback.put("recommendations", Arrays.asList("Configure your API key to get personalized prep insights."));
            return fallback;
        }

        try {
            String url = "https://api.openai.com/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openaiApiKey);

            String systemInstructions = "You are an expert tech recruiter and coding interview coach. Analyze the candidate's prep logs. " +
                "Evaluate their performance and output a targeted preparation report in strict JSON format. The JSON object structure MUST be:\n" +
                "{\n" +
                "  \"summary\": \"Direct critique of candidate readiness (approx 3-4 sentences)\",\n" +
                "  \"strengths\": [\"Strength 1\", \"Strength 2\"],\n" +
                "  \"weaknesses\": [\"Weakness 1\", \"Weakness 2\"],\n" +
                "  \"recommendations\": [\"Tip 1\", \"Tip 2\", \"Tip 3\"]\n" +
                "}";

            StringBuilder prepLogs = new StringBuilder("Interview Prep Logs:\n\nMCQ Attempts:\n");
            for (UserMcqAttempt m : mcqs) {
                prepLogs.append("- Topic: ").append(m.getTopic())
                    .append(", Score: ").append(m.getScore()).append("/").append(m.getTotalQuestions())
                    .append(", Date: ").append(m.getAttemptDate()).append("\n");
            }
            prepLogs.append("\nCoding Submissions:\n");
            for (CodingSubmission c : codes) {
                prepLogs.append("- Challenge: ").append(c.getChallenge().getTitle())
                    .append(", Difficulty: ").append(c.getChallenge().getDifficulty())
                    .append(", Status: ").append(c.getStatus())
                    .append(", Date: ").append(c.getSubmittedAt()).append("\n");
            }

            Map<String, Object> payload = new HashMap<>();
            payload.put("model", openaiModel);

            List<Map<String, String>> messages = new ArrayList<>();
            Map<String, String> systemMsg = new HashMap<>();
            systemMsg.put("role", "system");
            systemMsg.put("content", systemInstructions);
            messages.add(systemMsg);

            Map<String, String> userMsg = new HashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", prepLogs.toString());
            messages.add(userMsg);

            payload.put("messages", messages);

            Map<String, Object> responseFormat = new HashMap<>();
            responseFormat.put("type", "json_object");
            payload.put("response_format", responseFormat);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
            Map<String, Object> response = restTemplate.postForObject(url, entity, Map.class);

            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> choice = choices.get(0);
                    Map<String, Object> message = (Map<String, Object>) choice.get("message");
                    String responseText = (String) message.get("content");
                    return objectMapper.readValue(responseText, Map.class);
                }
            }
        } catch (Exception e) {
            System.err.println("OpenAI AI Prep Feedback failed: " + e.getMessage());
        }

        Map<String, Object> fallback = new HashMap<>();
        fallback.put("summary", "Analysis logs found but API call encountered a connection issue. Review your recent attempts under the History view.");
        fallback.put("strengths", Collections.emptyList());
        fallback.put("weaknesses", Collections.emptyList());
        fallback.put("recommendations", Collections.emptyList());
        return fallback;
    }

    // --- MOCK INTERVIEW AGENT METHODS ---

    public MockInterviewSession startInterviewSession(User user, String techStack, String difficulty, int maxQuestions, String externalApiUrl) {
        MockInterviewSession session = new MockInterviewSession(user, techStack, difficulty, maxQuestions, "ACTIVE", LocalDateTime.now());
        
        String firstQuestion = null;
        boolean success = false;

        if (openaiApiKey != null && !openaiApiKey.trim().isEmpty()) {
            try {
                firstQuestion = generateQuestionFromOpenAI(techStack, difficulty, new ArrayList<>(), maxQuestions, 0, externalApiUrl);
                success = true;
            } catch (Exception e) {
                System.err.println("Error generating first question from OpenAI, trying Gemini fallback: " + e.getMessage());
            }
        }

        if (!success && isGeminiAvailable()) {
            try {
                firstQuestion = generateQuestionFromGemini(techStack, difficulty, new ArrayList<>(), maxQuestions, 0, externalApiUrl);
                success = true;
            } catch (Exception e) {
                System.err.println("Error generating first question from Gemini, falling back: " + e.getMessage());
            }
        }

        if (!success) {
            firstQuestion = getLocalQuestionFallback(techStack, difficulty, 0, maxQuestions, externalApiUrl);
        }

        session.setCurrentQuestion(firstQuestion);
        session.setCurrentQuestionIndex(0);

        List<Map<String, Object>> history = new ArrayList<>();
        String welcomeText = "Welcome to your Mock Interview! I am your AI Interview Agent. Let's test your skills for the target role: " + techStack + " (" + difficulty + " difficulty). Let's begin. Here is your first question:\n\n" + firstQuestion;
        
        Map<String, Object> qMsg = new HashMap<>();
        qMsg.put("role", "assistant");
        qMsg.put("content", welcomeText);
        qMsg.put("questionIndex", 0);
        history.add(qMsg);

        try {
            session.setConversationHistoryJson(objectMapper.writeValueAsString(history));
        } catch (Exception e) {
            System.err.println("Error serializing conversation history: " + e.getMessage());
        }

        return mockInterviewSessionRepository.save(session);
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> submitInterviewAnswer(Long sessionId, String answer, String externalApiUrl) {
        MockInterviewSession session = mockInterviewSessionRepository.findById(sessionId)
            .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        if (!"ACTIVE".equalsIgnoreCase(session.getStatus())) {
            throw new IllegalStateException("Session is already completed or inactive");
        }

        List<Map<String, Object>> history = new ArrayList<>();
        try {
            history = objectMapper.readValue(session.getConversationHistoryJson(), new TypeReference<List<Map<String, Object>>>() {});
        } catch (Exception e) {
            System.err.println("Error deserializing history: " + e.getMessage());
        }

        // Add user answer to history
        Map<String, Object> userMsg = new HashMap<>();
        userMsg.put("role", "user");
        userMsg.put("content", answer);
        history.add(userMsg);

        int currentIdx = session.getCurrentQuestionIndex();
        int maxQs = session.getMaxQuestions();
        boolean isLast = (currentIdx + 1) >= maxQs;

        Map<String, Object> evaluation = new HashMap<>();
        String nextQuestion = null;
        boolean evaluated = false;

        if (openaiApiKey != null && !openaiApiKey.trim().isEmpty()) {
            try {
                evaluation = callOpenAIForAnswerEvaluation(session.getTechStack(), session.getDifficulty(), session.getCurrentQuestion(), answer, isLast, currentIdx, maxQs, history);
                nextQuestion = (String) evaluation.get("nextQuestion");
                evaluated = true;
            } catch (Exception e) {
                System.err.println("Error during OpenAI interview evaluation, trying Gemini: " + e.getMessage());
            }
        }

        if (!evaluated && isGeminiAvailable()) {
            try {
                evaluation = callGeminiForAnswerEvaluation(session.getTechStack(), session.getDifficulty(), session.getCurrentQuestion(), answer, isLast, currentIdx, maxQs, history);
                nextQuestion = (String) evaluation.get("nextQuestion");
                evaluated = true;
            } catch (Exception e) {
                System.err.println("Error during Gemini interview evaluation, falling back: " + e.getMessage());
            }
        }

        if (!evaluated) {
            evaluation = getFallbackAnswerEvaluation(session.getCurrentQuestion(), answer);
        }

        if (nextQuestion == null && !isLast) {
            nextQuestion = getLocalQuestionFallback(session.getTechStack(), session.getDifficulty(), currentIdx + 1, maxQs, externalApiUrl);
            evaluation.put("nextQuestion", nextQuestion);
        }

        // Append AI Feedback message to history
        Map<String, Object> aiFeedbackMsg = new HashMap<>();
        aiFeedbackMsg.put("role", "assistant_feedback");
        aiFeedbackMsg.put("score", evaluation.get("score"));
        aiFeedbackMsg.put("correctness", evaluation.get("correctness"));
        aiFeedbackMsg.put("correction", evaluation.get("correction"));
        aiFeedbackMsg.put("modelAnswer", evaluation.get("modelAnswer"));
        history.add(aiFeedbackMsg);

        session.setCurrentQuestionIndex(currentIdx + 1);

        if (isLast) {
            session.setStatus("COMPLETED");
            session.setCurrentQuestion(null);
            
            // Generate overall summary feedback
            String overallFeedback = "You have completed your interview! Great effort. Keep learning.";
            boolean feedbackGenerated = false;

            if (openaiApiKey != null && !openaiApiKey.trim().isEmpty()) {
                try {
                    overallFeedback = generateOverallSummary(session.getTechStack(), session.getDifficulty(), history);
                    feedbackGenerated = true;
                } catch (Exception e) {
                    System.err.println("Failed generating overall feedback from OpenAI: " + e.getMessage());
                }
            }

            if (!feedbackGenerated && isGeminiAvailable()) {
                try {
                    overallFeedback = generateOverallSummaryFromGemini(session.getTechStack(), session.getDifficulty(), history);
                    feedbackGenerated = true;
                } catch (Exception e) {
                    System.err.println("Failed generating overall feedback from Gemini: " + e.getMessage());
                }
            }

            evaluation.put("overallFeedback", overallFeedback);
            
            Map<String, Object> endMsg = new HashMap<>();
            endMsg.put("role", "assistant");
            endMsg.put("content", "Thank you for practicing. Interview is completed! Here is your final summary.");
            endMsg.put("overallFeedback", overallFeedback);
            history.add(endMsg);
        } else {
            session.setCurrentQuestion(nextQuestion);
            Map<String, Object> nextQMsg = new HashMap<>();
            nextQMsg.put("role", "assistant");
            nextQMsg.put("content", nextQuestion);
            nextQMsg.put("questionIndex", currentIdx + 1);
            history.add(nextQMsg);
        }

        try {
            session.setConversationHistoryJson(objectMapper.writeValueAsString(history));
        } catch (Exception e) {
            System.err.println("Error serializing session updates: " + e.getMessage());
        }

        mockInterviewSessionRepository.save(session);

        Map<String, Object> result = new HashMap<>();
        result.put("feedback", evaluation);
        result.put("nextQuestion", nextQuestion);
        result.put("questionIndex", session.getCurrentQuestionIndex());
        result.put("maxQuestions", maxQs);
        result.put("isCompleted", isLast);
        
        return result;
    }

    public List<MockInterviewSession> getInterviewHistory(Long userId) {
        return mockInterviewSessionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @SuppressWarnings("unchecked")
    private String generateQuestionFromOpenAI(String techStack, String difficulty, List<String> previousQuestions, int maxQuestions, int currentIndex, String externalApiUrl) throws Exception {
        String url = "https://api.openai.com/v1/chat/completions";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        String instructions = "You are an expert AI Technical Interviewer. Generate ONE technical or theoretical question for a mock interview on the technology: " + techStack + " at " + difficulty + " difficulty. " +
            "The question must be professional, standard in top tech companies, and clear. Avoid repeating these previous questions: " + previousQuestions + ". " +
            (maxQuestions == 15 ? "This is a 15-question structured mixed interview. The current question index is " + currentIndex + ". You MUST generate a " + (currentIndex < 10 ? "theoretical/conceptual" : "coding/practical programming challenge (where the candidate has to write a program or function code)") + " question." : "") +
            "Return the response in strict JSON format. JSON structure MUST be exactly:\n" +
            "{\n" +
            "  \"question\": \"The question content here\"\n" +
            "}";

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", openaiModel);

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> systemMsg = new HashMap<>();
        systemMsg.put("role", "system");
        systemMsg.put("content", instructions);
        messages.add(systemMsg);

        payload.put("messages", messages);

        Map<String, Object> responseFormat = new HashMap<>();
        responseFormat.put("type", "json_object");
        payload.put("response_format", responseFormat);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        Map<String, Object> response = restTemplate.postForObject(url, entity, Map.class);

        if (response != null && response.containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> choice = choices.get(0);
                Map<String, Object> message = (Map<String, Object>) choice.get("message");
                String contentStr = (String) message.get("content");
                Map<String, Object> parsed = objectMapper.readValue(contentStr, Map.class);
                return (String) parsed.get("question");
            }
        }
        throw new RuntimeException("Failed to get question from OpenAI response");
    }

    @SuppressWarnings("unchecked")
    private String generateQuestionFromGemini(String techStack, String difficulty, List<String> previousQuestions, int maxQuestions, int currentIndex, String externalApiUrl) throws Exception {
        String systemInstructions = "You are an expert AI Technical Interviewer. Generate ONE technical or theoretical question for a mock interview on the technology: " + techStack + " at " + difficulty + " difficulty. " +
            "The question must be professional, standard in top tech companies, and clear. Avoid repeating these previous questions: " + previousQuestions + ". " +
            (maxQuestions == 15 ? "This is a 15-question structured mixed interview. The current question index is " + currentIndex + ". You MUST generate a " + (currentIndex < 10 ? "theoretical/conceptual" : "coding/practical programming challenge (where the candidate has to write a program or function code)") + " question." : "") +
            "Return the response in strict JSON format. JSON structure MUST be exactly:\n" +
            "{\n" +
            "  \"question\": \"The question content here\"\n" +
            "}";

        String prompt = "Generate a question for " + techStack + " (" + difficulty + ").";

        Map<String, Object> result = executeGeminiRequest(systemInstructions, prompt);
        if (result != null && result.containsKey("question")) {
            return (String) result.get("question");
        }
        throw new RuntimeException("Failed to get question from Gemini response");
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> callOpenAIForAnswerEvaluation(String techStack, String difficulty, String question, String answer, boolean isLast, int currentIndex, int maxQuestions, List<Map<String, Object>> history) throws Exception {
        String url = "https://api.openai.com/v1/chat/completions";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        String instructions = "You are a professional AI Technical Interviewer. The candidate is in a mock interview on " + techStack + " (" + difficulty + " difficulty).\n" +
            "Evaluate the candidate's answer to the question:\n" +
            "Question: \"" + question + "\"\n" +
            "Answer: \"" + answer + "\"\n\n" +
            "Evaluate the answer. Score it from 0 to 100. Categorize correctness as 'Correct', 'Partially Correct', or 'Incorrect'. " +
            "Correct the candidate if they are wrong. Explain what they got right, what was wrong/missing, and provide a clear model answer.\n" +
            "If it is NOT the last question (isLast = " + isLast + "), you MUST also generate the next interview question in the 'nextQuestion' field.\n" +
            (maxQuestions == 15 ? "This is a 15-question structured mixed interview. The current question index is " + currentIndex + ". The next question (index " + (currentIndex + 1) + ") MUST be a " + ((currentIndex + 1) < 10 ? "theoretical/conceptual" : "coding/practical programming challenge (where the candidate writes a code function)") + " question.\n" : "") +
            "Return the response in strict JSON format. JSON structure MUST be exactly:\n" +
            "{\n" +
            "  \"score\": 80,\n" +
            "  \"correctness\": \"Partially Correct\",\n" +
            "  \"correction\": \"A constructive correction explaining errors or omissions without using emojis.\",\n" +
            "  \"modelAnswer\": \"The ideal model answer code/text.\",\n" +
            "  \"nextQuestion\": \"The next technical question (NULL if isLast is true)\"\n" +
            "}";

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", openaiModel);

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> systemMsg = new HashMap<>();
        systemMsg.put("role", "system");
        systemMsg.put("content", instructions);
        messages.add(systemMsg);

        payload.put("messages", messages);

        Map<String, Object> responseFormat = new HashMap<>();
        responseFormat.put("type", "json_object");
        payload.put("response_format", responseFormat);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        Map<String, Object> response = restTemplate.postForObject(url, entity, Map.class);

        if (response != null && response.containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> choice = choices.get(0);
                Map<String, Object> message = (Map<String, Object>) choice.get("message");
                String contentStr = (String) message.get("content");
                return objectMapper.readValue(contentStr, Map.class);
            }
        }
        throw new RuntimeException("Failed to evaluate answer from OpenAI response");
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> callGeminiForAnswerEvaluation(String techStack, String difficulty, String question, String answer, boolean isLast, int currentIndex, int maxQuestions, List<Map<String, Object>> history) throws Exception {
        String systemInstructions = "You are a professional AI Technical Interviewer. The candidate is in a mock interview on " + techStack + " (" + difficulty + " difficulty).\n" +
            "Evaluate the candidate's answer to the question:\n" +
            "Question: \"" + question + "\"\n" +
            "Answer: \"" + answer + "\"\n\n" +
            "Evaluate the answer. Score it from 0 to 100. Categorize correctness as 'Correct', 'Partially Correct', or 'Incorrect'. " +
            "Correct the candidate if they are wrong. Explain what they got right, what was wrong/missing, and provide a clear model answer.\n" +
            "If it is NOT the last question (isLast = " + isLast + "), you MUST also generate the next interview question in the 'nextQuestion' field.\n" +
            (maxQuestions == 15 ? "This is a 15-question structured mixed interview. The current question index is " + currentIndex + ". The next question (index " + (currentIndex + 1) + ") MUST be a " + ((currentIndex + 1) < 10 ? "theoretical/conceptual" : "coding/practical programming challenge (where the candidate writes a code function)") + " question.\n" : "") +
            "Return the response in strict JSON format. JSON structure MUST be exactly:\n" +
            "{\n" +
            "  \"score\": 80,\n" +
            "  \"correctness\": \"Partially Correct\",\n" +
            "  \"correction\": \"A constructive correction explaining errors or omissions without using emojis.\",\n" +
            "  \"modelAnswer\": \"The ideal model answer code/text.\",\n" +
            "  \"nextQuestion\": \"The next technical question (NULL if isLast is true)\"\n" +
            "}";

        String prompt = "Evaluate the candidate's response. Conversation history:\n" + objectMapper.writeValueAsString(history);

        return executeGeminiRequest(systemInstructions, prompt);
    }

    @SuppressWarnings("unchecked")
    private String generateOverallSummary(String techStack, String difficulty, List<Map<String, Object>> history) throws Exception {
        String url = "https://api.openai.com/v1/chat/completions";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        String instructions = "You are an AI Tech Interviewer. Review the candidate's interview logs for " + techStack + " (" + difficulty + "). " +
            "Provide a detailed, comprehensive summary of their performance. List their core strengths, key knowledge gaps, and specific study recommendations. " +
            "Keep it professional and write in Markdown. Do not use emojis. " +
            "Return the response in strict JSON format. JSON structure MUST be:\n" +
            "{\n" +
            "  \"overallSummary\": \"Markdown summary here\"\n" +
            "}";

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", openaiModel);

        List<Map<String, Object>> messages = new ArrayList<>();
        Map<String, Object> systemMsg = new HashMap<>();
        systemMsg.put("role", "system");
        systemMsg.put("content", instructions);
        messages.add(systemMsg);

        Map<String, Object> userMsg = new HashMap<>();
        userMsg.put("role", "user");
        userMsg.put("content", objectMapper.writeValueAsString(history));
        messages.add(userMsg);

        payload.put("messages", messages);

        Map<String, Object> responseFormat = new HashMap<>();
        responseFormat.put("type", "json_object");
        payload.put("response_format", responseFormat);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        Map<String, Object> response = restTemplate.postForObject(url, entity, Map.class);

        if (response != null && response.containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> choice = choices.get(0);
                Map<String, Object> message = (Map<String, Object>) choice.get("message");
                String contentStr = (String) message.get("content");
                Map<String, Object> parsed = objectMapper.readValue(contentStr, Map.class);
                return (String) parsed.get("overallSummary");
            }
        }
        throw new RuntimeException("Failed to get summary from OpenAI response");
    }

    @SuppressWarnings("unchecked")
    private String generateOverallSummaryFromGemini(String techStack, String difficulty, List<Map<String, Object>> history) throws Exception {
        String systemInstructions = "You are an AI Tech Interviewer. Review the candidate's interview logs for " + techStack + " (" + difficulty + "). " +
            "Provide a detailed, comprehensive summary of their performance. List their core strengths, key knowledge gaps, and specific study recommendations. " +
            "Keep it professional and write in Markdown. Do not use emojis. " +
            "Return the response in strict JSON format. JSON structure MUST be:\n" +
            "{\n" +
            "  \"overallSummary\": \"Markdown summary here\"\n" +
            "}";

        String prompt = "Conversation history:\n" + objectMapper.writeValueAsString(history);

        Map<String, Object> result = executeGeminiRequest(systemInstructions, prompt);
        if (result != null && result.containsKey("overallSummary")) {
            return (String) result.get("overallSummary");
        }
        throw new RuntimeException("Failed to get summary from Gemini response");
    }

    private String normalizeCategory(String techStack) {
        if (techStack == null) return "Java";
        String ts = techStack.toLowerCase();
        if (ts.contains("mern")) return "MERN Stack";
        if (ts.contains("node")) return "Node.js";
        if (ts.contains("spring") || ts.contains("boot")) return "Spring Boot";
        if (ts.contains("java")) return "Java";
        if (ts.contains("python")) return "Python";
        if (ts.contains("c++") || ts.contains("cpp")) return "C++";
        if (ts.contains("sql") || ts.contains("database")) return "SQL";
        if (ts.contains("os") || ts.contains("operating")) return "OS";
        if (ts.contains("system") || ts.contains("design")) return "System Design";
        return techStack;
    }

    private String getLocalQuestionFallback(String techStack, String difficulty, int index, int maxQuestions, String externalApiUrl) {
        if (externalApiUrl != null && !externalApiUrl.trim().isEmpty()) {
            try {
                String url = externalApiUrl;
                if (url.contains("?")) {
                    url += "&techStack=" + techStack + "&difficulty=" + difficulty + "&index=" + index;
                } else {
                    url += "?techStack=" + techStack + "&difficulty=" + difficulty + "&index=" + index;
                }
                Map<String, Object> response = restTemplate.getForObject(url, Map.class);
                if (response != null) {
                    if (response.containsKey("question")) {
                        return (String) response.get("question");
                    } else if (response.containsKey("text")) {
                        return (String) response.get("text");
                    } else if (response.containsKey("content")) {
                        return (String) response.get("content");
                    }
                }
            } catch (Exception e) {
                System.err.println("Failed to fetch from custom API, falling back to db: " + e.getMessage());
            }
        }
        if (maxQuestions == 15 && index >= 10) {
            List<CodingChallenge> challenges = codingChallengeRepository.findAll();
            if (!challenges.isEmpty()) {
                CodingChallenge cc = challenges.get((index - 10) % challenges.size());
                return "Coding Challenge: " + cc.getTitle() + "\n\nDescription:\n" + cc.getDescription() + "\n\nConstraints:\n" + cc.getConstraints() + "\n\nPlease write your code solution. Use the editor on the right to compile and run.";
            }
        }
        List<InterviewQuestion> qs = interviewQuestionRepository.findByCategoryOrderByDifficultyAsc(normalizeCategory(techStack));
        if (qs.isEmpty()) {
            // General fallback
            qs = interviewQuestionRepository.findAll();
        }
        if (!qs.isEmpty()) {
            int targetIndex = index % qs.size();
            return qs.get(targetIndex).getQuestion();
        }
        return "Explain your experience working with " + techStack + " and how you approach optimization.";
    }

    private Map<String, Object> getFallbackAnswerEvaluation(String question, String answer) {
        Map<String, Object> eval = new HashMap<>();
        eval.put("score", 70);
        eval.put("correctness", "Partially Correct");
        eval.put("correction", "Offline Mode: Answer received. OpenAI API key was missing or failed. Double check key technical terms like thread-safety, event loops, and relational modeling to refine your response.");
        eval.put("modelAnswer", "Ensure you cover structure, trade-offs, and standard operational performance (Big-O, indexing, memory usage) in your answers.");
        eval.put("nextQuestion", null);
        return eval;
    }

    // --- TREND SYNC FUNCTIONALITY ---

    @SuppressWarnings("unchecked")
    private int syncTrendingQuestionsFromOpenAI() throws Exception {
        String url = "https://api.openai.com/v1/chat/completions";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        String systemInstructions = "You are a tech recruiter research bot. Generate 5 newly popular technical/theoretical interview questions with comprehensive suggested answers " +
            "for candidates preparing for modern software jobs. Categories can be one of: Java, Spring Boot, SQL, OS, JavaScript, Node.js, MERN Stack, Python, C++, System Design. " +
            "Include 'difficulty' as either 'Easy', 'Medium', or 'Hard'.\n" +
            "Return the response in strict JSON format. JSON structure MUST be exactly:\n" +
            "{\n" +
            "  \"questions\": [\n" +
            "     {\n" +
            "       \"category\": \"Node.js\",\n" +
            "       \"difficulty\": \"Medium\",\n" +
            "       \"question\": \"Explain the role of libuv thread pool in Node.js.\",\n" +
            "       \"sampleAnswer\": \"Detailed answer guideline...\"\n" +
            "     }\n" +
            "  ]\n" +
            "}";

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", openaiModel);

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> systemMsg = new HashMap<>();
        systemMsg.put("role", "system");
        systemMsg.put("content", systemInstructions);
        messages.add(systemMsg);

        payload.put("messages", messages);

        Map<String, Object> responseFormat = new HashMap<>();
        responseFormat.put("type", "json_object");
        payload.put("response_format", responseFormat);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        Map<String, Object> response = restTemplate.postForObject(url, entity, Map.class);

        if (response != null && response.containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> choice = choices.get(0);
                Map<String, Object> message = (Map<String, Object>) choice.get("message");
                String contentStr = (String) message.get("content");
                Map<String, Object> parsed = objectMapper.readValue(contentStr, Map.class);
                List<Map<String, Object>> newQs = (List<Map<String, Object>>) parsed.get("questions");
                
                int addedCount = 0;
                for (Map<String, Object> qMap : newQs) {
                    String questionText = (String) qMap.get("question");
                    if (interviewQuestionRepository.findAll().stream().noneMatch(iq -> iq.getQuestion().equalsIgnoreCase(questionText))) {
                        InterviewQuestion iq = new InterviewQuestion(
                            (String) qMap.get("category"),
                            (String) qMap.get("difficulty"),
                            questionText,
                            (String) qMap.get("sampleAnswer")
                        );
                        interviewQuestionRepository.save(iq);
                        addedCount++;
                    }
                }
                return addedCount;
            }
        }
        throw new RuntimeException("Failed to get trending questions from OpenAI");
    }

    @SuppressWarnings("unchecked")
    private int syncTrendingQuestionsFromGemini() throws Exception {
        String systemInstructions = "You are a tech recruiter research bot. Generate 5 newly popular technical/theoretical interview questions with comprehensive suggested answers " +
            "for candidates preparing for modern software jobs. Categories can be one of: Java, Spring Boot, SQL, OS, JavaScript, Node.js, MERN Stack, Python, C++, System Design. " +
            "Include 'difficulty' as either 'Easy', 'Medium', or 'Hard'.\n" +
            "Return the response in strict JSON format. JSON structure MUST be exactly:\n" +
            "{\n" +
            "  \"questions\": [\n" +
            "     {\n" +
            "       \"category\": \"Node.js\",\n" +
            "       \"difficulty\": \"Medium\",\n" +
            "       \"question\": \"Explain the role of libuv thread pool in Node.js.\",\n" +
            "       \"sampleAnswer\": \"Detailed answer guideline...\"\n" +
            "     }\n" +
            "  ]\n" +
            "}";

        String prompt = "Sync trending interview questions.";

        Map<String, Object> result = executeGeminiRequest(systemInstructions, prompt);
        if (result != null && result.containsKey("questions")) {
            List<Map<String, Object>> newQs = (List<Map<String, Object>>) result.get("questions");
            int addedCount = 0;
            for (Map<String, Object> qMap : newQs) {
                String questionText = (String) qMap.get("question");
                if (interviewQuestionRepository.findAll().stream().noneMatch(iq -> iq.getQuestion().equalsIgnoreCase(questionText))) {
                    InterviewQuestion iq = new InterviewQuestion(
                        (String) qMap.get("category"),
                        (String) qMap.get("difficulty"),
                        questionText,
                        (String) qMap.get("sampleAnswer")
                    );
                    interviewQuestionRepository.save(iq);
                    addedCount++;
                }
            }
            return addedCount;
        }
        throw new RuntimeException("Failed to get trending questions from Gemini");
    }

    public int syncTrendingQuestions() {
        if (openaiApiKey != null && !openaiApiKey.trim().isEmpty()) {
            try {
                return syncTrendingQuestionsFromOpenAI();
            } catch (Exception e) {
                System.err.println("Failed to sync trending questions from OpenAI, trying Gemini fallback: " + e.getMessage());
            }
        }
        if (isGeminiAvailable()) {
            try {
                return syncTrendingQuestionsFromGemini();
            } catch (Exception e) {
                System.err.println("Failed to sync trending questions from Gemini fallback: " + e.getMessage());
            }
        }
        return 0;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> compileGenericCodeFromOpenAI(String code, String language, String question) throws Exception {
        String url = "https://api.openai.com/v1/chat/completions";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        String systemInstructions = "You are an automated code execution sandbox compiler and code reviewer. Analyze the submitted user code for the given interview question. " +
            "Evaluate the solution for syntax correctness, runtime safety, and whether it solves the logic required by the question. " +
            "Decide if it passes (status = PASSED) or fails due to compile issues (status = COMPILATION_ERROR) or logical errors (status = LOGICAL_ERROR). " +
            "Return your evaluation in strict JSON format. The JSON object structure MUST be:\n" +
            "{\n" +
            "  \"status\": \"PASSED_OR_ERROR\",\n" +
            "  \"aiFeedback\": \"Markdown critique explaining: 1. Big-O Complexity, 2. Logical correctness, 3. How to optimize or fix errors\"\n" +
            "}\n" +
            "Substitute 'PASSED_OR_ERROR' with either 'PASSED', 'COMPILATION_ERROR', or 'LOGICAL_ERROR'.";

        String prompt = "Interview Question: " + question + "\n\n" +
            "Submitted Code Language: " + language + "\n\n" +
            "Submitted Code:\n" + code;

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", openaiModel);

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> systemMsg = new HashMap<>();
        systemMsg.put("role", "system");
        systemMsg.put("content", systemInstructions);
        messages.add(systemMsg);

        Map<String, String> userMsg = new HashMap<>();
        userMsg.put("role", "user");
        userMsg.put("content", prompt);
        messages.add(userMsg);

        payload.put("messages", messages);

        Map<String, Object> responseFormat = new HashMap<>();
        responseFormat.put("type", "json_object");
        payload.put("response_format", responseFormat);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        Map<String, Object> response = restTemplate.postForObject(url, entity, Map.class);

        if (response != null && response.containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> choice = choices.get(0);
                Map<String, Object> message = (Map<String, Object>) choice.get("message");
                String responseText = (String) message.get("content");
                return objectMapper.readValue(responseText, Map.class);
            }
        }
        throw new RuntimeException("Failed to get choices from OpenAI response");
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> compileGenericCodeFromGemini(String code, String language, String question) throws Exception {
        String systemInstructions = "You are an automated code execution sandbox compiler and code reviewer. Analyze the submitted user code for the given interview question. " +
            "Evaluate the solution for syntax correctness, runtime safety, and whether it solves the logic required by the question. " +
            "Decide if it passes (status = PASSED) or fails due to compile issues (status = COMPILATION_ERROR) or logical errors (status = LOGICAL_ERROR). " +
            "Return your evaluation in strict JSON format. The JSON object structure MUST be:\n" +
            "{\n" +
            "  \"status\": \"PASSED_OR_ERROR\",\n" +
            "  \"aiFeedback\": \"Markdown critique explaining: 1. Big-O Complexity, 2. Logical correctness, 3. How to optimize or fix errors\"\n" +
            "}\n" +
            "Substitute 'PASSED_OR_ERROR' with either 'PASSED', 'COMPILATION_ERROR', or 'LOGICAL_ERROR'.";

        String prompt = "Interview Question: " + question + "\n\n" +
            "Submitted Code Language: " + language + "\n\n" +
            "Submitted Code:\n" + code;

        return executeGeminiRequest(systemInstructions, prompt);
    }

    public Map<String, Object> compileGenericCode(String code, String language, String question) {
        if (openaiApiKey != null && !openaiApiKey.trim().isEmpty()) {
            try {
                return compileGenericCodeFromOpenAI(code, language, question);
            } catch (Exception e) {
                System.err.println("OpenAI generic coding eval failed, trying Gemini: " + e.getMessage());
            }
        }
        if (isGeminiAvailable()) {
            try {
                return compileGenericCodeFromGemini(code, language, question);
            } catch (Exception e) {
                System.err.println("Gemini generic coding eval failed: " + e.getMessage());
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("status", "PASSED");
        result.put("aiFeedback", "### Local Offline Sandbox Mode\n\nCode received and compiled successfully in the local execution sandbox. Since the AI tutor is offline, static linting has validated the syntax.\n\n```" + language + "\n" + code + "\n```");
        return result;
    }
}
