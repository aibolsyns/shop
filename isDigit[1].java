import java.util.Scanner;
public class isDigit {
        public static boolean isDigit(String s) {
            int a=s.length()-1;
            if(a==-1) return true;
            if(!Character.isDigit(s.charAt(a))){
                System.out.print(s.charAt(a));
                return false;
            }
            return isDigit(s.substring(0,s.length()-1));
        }
        public static void main (String[] args)
        {
            Scanner sc= new Scanner(System.in); //System.in is a standard input stream
            String s= sc.nextLine();
            System.out.println(isDigit(s));
        }
}
