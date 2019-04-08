import play.api.ApplicationLoader.Context
import play.api.{Application, ApplicationLoader}

class AppLoader extends ApplicationLoader {
  override def load(context: Context): Application = {
    new AppComponents(context, context.initialConfiguration.underlying).application
  }
}
