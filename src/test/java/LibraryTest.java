/*
 * This Java source file was generated by the Gradle 'init' task.
 */
import org.junit.Test;
import org.mockito.Mockito;

import static org.junit.Assert.*;

public class LibraryTest {
	
    @Test 
    public void testSomeLibraryMethod() {
        Library classUnderTest = Mockito.mock(Library.class);
        Mockito.when(classUnderTest.someLibraryMethod()).thenReturn(true);
        assertTrue(classUnderTest.someLibraryMethod());
       
    }
}
