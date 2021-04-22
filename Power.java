package com.company;

import java.util.Scanner;

public class Power {
    public static void main(String[] args) {
        int a , b;
        System.out.println("Enter the values of a and b: ");
        Scanner sc= new Scanner(System.in);
        a= sc.nextInt();
        b= sc.nextInt();

        System.out.println(FindPower(a, b));
    }
    public static int FindPower(int base, int power) {
        if (power == 0)
            return 1;
        else
            return (base * FindPower(base, power-1));
    }
}

