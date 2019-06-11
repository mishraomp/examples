package com.om.example.springreactivemongodb;

import com.om.example.springreactivemongodb.model.Employee;
import org.junit.Test;
import sun.nio.ch.ThreadPool;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

import static io.restassured.RestAssured.given;

public class EmployeeTest {

    /*@Test
    public void test_whenGivenInputEmployeeShouldStoreInMongo() {
        for (Integer i = 50001; i < 100000; i++) {
            final Employee employee = Employee.builder().age(i).employeeId("employeeId" + i).employeeName("EmployeeName" + Math.random() + i).build();
            given().contentType("application/json").body(employee).when().post("http://localhost:8090/api/v1/employee").then().statusCode(201);
        }
    }*/

  /*  @Test
    public void test_whenGivenEmployeeIdIsValidInLoopShouldReturn200Response() {
        System.out.println(new Date());
        final ThreadPoolExecutor executor = new ThreadPoolExecutor(500, 1000, 0L, TimeUnit.SECONDS, new ArrayBlockingQueue<>(100000));
        final AtomicInteger val = new AtomicInteger(0);
        final List<Future<String>> results = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            final Callable<String> getEmployeeTask =
                    () -> test_whenGivenEmployeeIdIsValidShouldReturn200Response(val.incrementAndGet());
            final Future<String> result =
                    executor.submit(getEmployeeTask);
            results.add(result);
        }
        for(Future<String> res: results){
            try {
                String re = res.get();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

        }
        executor.shutdown();
        System.out.println(new Date());
    }*/



}
