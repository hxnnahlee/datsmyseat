import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.net.*;

class Database {
     /**
     * The connection to the database.  When there is no connection, it should
     * be null.  Otherwise, there is a valid open connection
     */
    private Connection mConnection;


    private PreparedStatement mUpdateCount;
    private PreparedStatement mUpdateState;

    private PreparedStatement mSelectAll;
    private PreparedStatement mSelectSensor;

    public static class SensorData {
        int sensorID;
        int state;
        int count;

        public int getSensorID() {
            return sensorID;
        }

        public int getState() {
            return state;
        }

        public int getCount() {
            return count;
        }

        public SensorData(int sensorID, int state, int count) {
            this.sensorID = sensorID;
            this.state = state;
            this.count = count;
        }
    }

    /**
     * The Database constructor is private: we only create Database objects
     * through the getDatabase() method.
     */
    private Database() {
    }

    static Database getDatabase() {

        Database db = new Database();

        // Give the Database object a connection, fail if we cannot get one
        try {
            Class.forName("org.postgresql.Driver");

            URI dbUri = new URI(System.getenv("DATABASE_URL"));

            String username = dbUri.getUserInfo().split(":")[0];
            String name = dbUri.getUserInfo().split(":")[1];
            String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

            Connection conn = DriverManager.getConnection(dbUrl, username, name);

            if (conn == null) {
                System.err.println("Error: DriverManager.getConnection() returned a null object");
                return null;
            }

            db.mConnection = conn;

        }

        catch (SQLException e) {
            System.err.println("Error: DriverManager.getConnection() threw a SQLException");
            e.printStackTrace();

            return null;
        }

        catch (ClassNotFoundException cnfe) {
            System.out.println("Unable to find postgresql driver");

            return null;
        }

        catch (URISyntaxException s) {
            System.out.println("URI Syntax Error");
            return null;
        }

        try {
            db.mUpdateState = db.mConnection.prepareStatement("UPDATE sensor SET state = ? WHERE id = ?");
            db.mUpdateCount = db.mConnection.prepareStatement("UPDATE sensor SET count = ? WHERE id = ?");
            db.mSelectAll = db.mConnection.prepareStatement("SELECT * FROM sensor");
            db.mSelectSensor = db.mConnection.prepareStatement("SELECT * from sensor WHERE id= ?");
        }

        catch (SQLException e) {
            System.err.println("Error creating prepared statement");
            e.printStackTrace();
            db.disconnect();

            return null;
        }

        return db;
    }

    /**
     * Close the current connection to the database, if one exists.
     *
     * NB: The connection will always be null after this call, even if an
     *     error occurred during the closing operation.
     *
     * @return True if the connection was cleanly closed, false otherwise
     */
    boolean disconnect() {
        if (mConnection == null) {
            System.err.println("Unable to close connection: Connection was null");
            return false;
        }
        try {
            mConnection.close();
        } catch (SQLException e) {
            System.err.println("Error: Connection.close() threw a SQLException");
            e.printStackTrace();
            mConnection = null;
            return false;
        }
        mConnection = null;
        return true;
    }

    void updateCount(int id, int count) {
        try {
            mUpdateCount.setInt(1, count);
            mUpdateCount.setInt(2, id);
            mUpdateCount.executeUpdate();
        }

        catch (SQLException e) {
            e.printStackTrace();
        }
    }

    void updateState(int id, int state) {
        try {
            mUpdateState.setInt(1, state);
            mUpdateState.setInt(2, id);
            mUpdateState.executeUpdate();
        }

        catch (SQLException e) {
            e.printStackTrace();
        }
    }

    ArrayList<SensorData> selectAllSensors() {
        ArrayList<SensorData> sensorList = new ArrayList<SensorData>();

        try {
            ResultSet rs = mSelectAll.executeQuery();

            while (rs.next()) {
                sensorList.add(new SensorData(rs.getInt("id"), rs.getInt("state"), rs.getInt("count")));
            }

            rs.close();
            return sensorList;
        }

        catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    SensorData selectSensor(int id) {
        SensorData result = null;

        try {
            mSelectSensor.setInt(1, id);
            ResultSet rs = mSelectSensor.executeQuery();
            if (rs.next()) {
                result = new SensorData(rs.getInt("id"), rs.getInt("state"), rs.getInt("count"));
            }
        }

        catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

}